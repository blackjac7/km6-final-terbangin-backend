const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const userRepo = require("../../repositories/user/index");
const paymentRepo = require("../../repositories/payment/index");
const bookingRepo = require("../../repositories/booking/index");
const notifRepo = require("../../repositories/notification/index");
const HttpError = require("../../utils/HttpError");
const { PaymentStatus, Midtrans } = require("../../utils/constants");
const { updatePaymentById } = require("../../repositories/payment/index");

/**
 * - nge-return object dengan key token dan redirect_url
 * - token bisa dipake untuk nge-display snap payment secara embedded (untuk web)
 * - redirect_url dipake untuk ngarahin ke suatu page snap payment (untuk android)
 */
exports.generateMidtransTransaction = async (payment) => {
    const belongingUser = await userRepo.getUserById(payment.userId);
    const payload = {
        transaction_details: {
            order_id: payment.id,
            gross_amount: payment.totalPrice,
        },
        credit_card: {
            secure: true,
        },
        customer_details: {
            first_name: belongingUser.fullName,
            email: belongingUser.email,
            phone: belongingUser.phoneNumber,
        },
    };
    // encode server key with base-64
    const authString = btoa(`${Midtrans.SERVER_KEY}:`);

    try {
        const response = await axios.post(
            Midtrans.TRANSACTION_SANDBOX_API,
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${authString}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new HttpError({
            statusCode: e.httpStatusCode,
            message: e.message,
        });
    }
};

exports.getPaymentStatusFromTransactionStatus = (transactionStatus) => {
    switch (transactionStatus) {
        case "pending":
            return PaymentStatus.UNPAID;
        case "success":
            return PaymentStatus.ISSUED;
        case "settlement":
            return PaymentStatus.ISSUED;
        case "cancel":
            return PaymentStatus.CANCELLED;
        case "expired":
            return PaymentStatus.CANCELLED;
        default:
            return null;
    }
};

// method yg dijalanin sama midtrans setelah pembayaran
exports.handleMidtransNotification = async (notification) => {
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
    );

    // Sample transactionStatus handling logic

    if (transactionStatus === "capture") {
        if (fraudStatus === "accept") {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            const transaction = await paymentRepo.getPaymentById(orderId);

            if (transaction.status !== PaymentStatus.ISSUED) {
                // buat invoice nya trus update data payment
                // await createPaymentInvoice(transaction);
                await notifRepo.updateNotificationByUserIdAndBookingId(transaction.userId, )
                return updatePaymentById(orderId, {
                    status: PaymentStatus.ISSUED,
                });
            }
        }
    } else if (transactionStatus === "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        const transaction = await paymentRepo.getPaymentById(orderId);

        if (transaction.status !== PaymentStatus.ISSUED) {
            // buat invoice nya trus update data payment
            // await createPaymentInvoice(transaction);
            return updatePaymentById(orderId, {
                status: PaymentStatus.ISSUED,
            });
        }
    } else if (
        transactionStatus === "cancel" ||
        transactionStatus === "deny" ||
        transactionStatus === "expire"
    ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        if (transaction.status !== PaymentStatus.CANCELLED) {
            return updatePaymentById(orderId, {
                status: PaymentStatus.CANCELLED,
            });
        }
    } else if (transactionStatus === "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        return updatePaymentById(orderId, {
            status: PaymentStatus.UNPAID,
        });
    }
    return null;
};

const createPaymentInvoice = async (payment) => {
    const belongingUser = await userRepo.getUserById(payment.userId);
    const belongingBookings = await bookingRepo.getBookingsByPaymentId(
        payment.id
    );
    const currentDate = new Date();
    const payload = {
        order_id: payment.id,
        invoice_number: uuidv4(),
        due_date: currentDate.toISOString(),
        invoice_date: currentDate.toISOString(),
        customer_details: {
            id: belongingUser.id,
            name: belongingUser.fullName,
            email: belongingUser.email,
            phone: belongingUser.phoneNumber,
        },
        item_details: [
            {
                item_id: belongingBookings[0].id,
                price: payment.totalPrice,
                description: "some description",
                quantity: belongingBookings.length,
            },
        ],
        notes: "invoice pembelian tiket",
        payment_type: "payment_link",
    };
    // encode server key with base-64
    const authString = btoa(`${Midtrans.SERVER_KEY}:`);

    try {
        const response = await axios.post(
            Midtrans.INVOICE_SANDBOX_API,
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${authString}`,
                },
            }
        );
        const data = response.data;
        // TO DO: add data invoice ke DB
    } catch (e) {
        throw new HttpError({
            statusCode: e.httpStatusCode,
            message: e.message,
        });
    }
};
