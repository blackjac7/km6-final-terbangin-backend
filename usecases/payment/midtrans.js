const userRepo = require("../../repositories/user/index");
const axios = require("axios");
const HttpError = require("../../utils/HttpError");

/**
 * - nge-return object dengan key token dan redirect_url
 * - token bisa dipake untuk nge-display snap payment secara embedded (untuk web)
 * - redirect_url dipake untuk ngarahin ke suatu page snap payment (untuk android)
 */
exports.generateMidtransPayment = async (payment) => {
    const belongingUser = await userRepo.getUserById(payment.userId);
    const currentDate = new Date();
    const remainingHoursUntilExpiry =
        (payment.expire - currentDate) / (1000 * 60 * 60);
    const data = {
        transaction_details: {
            order_id: payment.id,
            gross_amount: payment.totalPrice,
        },
        enabled_payments: [
            "credit_card",
            "gopay",
            "shopeepay",
            "permata_va",
            "bca_va",
            "bni_va",
            "bri_va",
            "echannel",
            "other_va",
            "Indomaret",
            "alfamart",
            "akulaku",
        ],
        credit_card: {
            secure: true,
        },
        customer_details: {
            full_name: belongingUser.fullName,
            email: belongingUser.email,
            phone: belongingUser.phoneNumber,
        },
        expiry: {
            start_time: currentDate.toISOString(),
            duration: remainingHoursUntilExpiry,
            unit: "hours",
        },
    };
    const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`); // base-64 encoding

    try {
        const response = await axios.post(
            process.env.MIDTRANS_SANDBOX_API,
            data,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Basic ${authString}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (e) {
        throw new HttpError({
            message: e.error_message,
        });
    }
};
