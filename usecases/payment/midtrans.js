const userRepo = require("../../repositories/user/index");
const midtrans = require("../../config/midtrans");
const HttpError = require("../../utils/HttpError");

/**
 * - nge-return object dengan key token dan redirect_url
 * - token bisa dipake untuk nge-display snap payment secara embedded (untuk web)
 * - redirect_url dipake untuk ngarahin ke suatu page snap payment (untuk android)
 */
exports.generateMidtransPayment = async (payment) => {
    const belongingUser = await userRepo.getUserById(payment.userId);
    const parameters = {
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
        // untuk sementara, akan di-redirect ke link2 ini
        callbacks: {
            finish: "https://google.com/",
            error: "https://example1.com",
        },
    };
    
    try {
        const response = await midtrans.createTransaction(parameters);
        return response;
    } catch (e) {
        throw new HttpError({
            statusCode: e.httpStatusCode,
            message: e.message,
        });
    }
};
