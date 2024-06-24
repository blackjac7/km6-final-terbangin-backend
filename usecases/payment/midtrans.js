const axios = require("axios");
const userRepo = require("../../repositories/user/index");
const HttpError = require("../../utils/HttpError");
const { PaymentStatus, clientUrl, Midtrans } = require("../../utils/constants");
const midtransApiClient = require("../../config/midtrans");
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
        callbacks: {
            finish: `${clientUrl}/payment-success`,
            error: `${clientUrl}/payment`,
        },
        expiry: {
            unit: "hour",
            duration: 10,
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

exports.handleMidtransNotification = async () => {
    midtransApiClient.transaction
        .notification(notificationJson)
        .then((statusResponse) => {
            let transactionId = statusResponse.transaction_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            // Sample transactionStatus handling logic

            if (transactionStatus === "capture") {
                if (fraudStatus === "accept") {
                    // TODO set transaction status on your database to 'success'
                    // and response with 200 OK
                    return updatePaymentById(transactionId, {
                        status: PaymentStatus.ISSUED,
                    });
                }
            } else if (transactionStatus === "settlement") {
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                return updatePaymentById(transactionId, {
                    status: PaymentStatus.ISSUED,
                });
            } else if (
                transactionStatus === "cancel" ||
                transactionStatus === "deny" ||
                transactionStatus === "expire"
            ) {
                // TODO set transaction status on your database to 'failure'
                // and response with 200 OK
                return updatePaymentById(transactionId, {
                    status: PaymentStatus.CANCELLED,
                });
            } else if (transactionStatus == "pending") {
                // TODO set transaction status on your database to 'pending' / waiting payment
                // and response with 200 OK
                return updatePaymentById(transactionId, {
                    status: PaymentStatus.UNPAID,
                });
            }
        });
};
