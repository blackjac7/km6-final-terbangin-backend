const axios = require("axios");
const userRepo = require("../../repositories/user/index");
const HttpError = require("../../utils/HttpError");
const { PaymentStatus, Midtrans, clientUrl } = require("../../utils/constants");
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
            Midtrans.SANDBOX_API,
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
            return updatePaymentById(orderId, {
                status: PaymentStatus.ISSUED,
            });
        }
    } else if (transactionStatus === "settlement") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        return updatePaymentById(orderId, {
            status: PaymentStatus.ISSUED,
        });
    } else if (
        transactionStatus === "cancel" ||
        transactionStatus === "deny" ||
        transactionStatus === "expire"
    ) {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        return updatePaymentById(orderId, {
            status: PaymentStatus.CANCELLED,
        });
    } else if (transactionStatus === "pending") {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        return updatePaymentById(orderId, {
            status: PaymentStatus.UNPAID,
        });
    }
    return null;
};
