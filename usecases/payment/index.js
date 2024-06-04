const paymentRepo = require("../../repositories/payment/index");
const paymentUtils = require("./utils");
const HttpError = require("../../middlewares/HttpError");
const { PaymentStatus } = require("../../constants/index");
const { v4: uuidv4 } = require("uuid");

exports.getPaymentById = async (id) => {
    const data = await paymentRepo.getPaymentById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with ID ${id} does not exist!`,
        });
    }
    const isExpired = paymentUtils.isPaymentExpired(data);

    if (isExpired) {
        await paymentRepo.updatePaymentById(id, {
            status: PaymentStatus.CANCELLED,
        });
        throw new HttpError({
            statusCode: 404,
            message: `Payment with ID ${id} has expired!`,
        });
    }
    if (data.status === PaymentStatus.CANCELLED) {
        throw new HttpError({
            statusCode: 403,
            message: `Payment with ID ${id} is already cancelled!`,
        });
    }
    return data;
};

exports.getPaymentsByUserId = async (userId) => {
    const data = await paymentRepo.getPaymentsByUserId(userId);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with user ID ${userId} does not exist!`,
        });
    }
    const isExpired = paymentUtils.isPaymentExpired(data);

    if (isExpired) {
        await paymentRepo.updatePaymentById(data.id, {
            status: PaymentStatus.CANCELLED,
        });
        throw new HttpError({
            statusCode: 404,
            message: `Payment with user ID ${userId} has expired!`,
        });
    }
    if (data.status === PaymentStatus.CANCELLED) {
        throw new HttpError({
            statusCode: 403,
            message: `Payment with user ID ${userId} is already cancelled!`,
        });
    }
    return data;
};

exports.addPayment = async (payload) => {
    const { method, totalPrice, user } = payload;

    if (!method) {
        throw new HttpError({
            statusCode: 400,
            message: "Field method must be filled!",
        });
    }
    if (!totalPrice) {
        throw new HttpError({
            statusCode: 400,
            message: "Field totalPrice must be filled!",
        });
    }
    payload = {
        ...payload,
        id: uuidv4(),
        userId: user.id,
        expire: paymentUtils.calculateExpiryDate(),
    };

    return paymentRepo.addPayment(payload);
};

exports.updatePaymentById = async (id, payload) => {
    const toBeUpdated = await this.getPaymentById(id);

    // payment yg statusnya issued udah ga bisa di-update lagi
    if (toBeUpdated.status === PaymentStatus.ISSUED) {
        return toBeUpdated;
    }
    return paymentRepo.updatePaymentById(id, {
        ...payload,
        updatedAt: new Date(),
    });
};

exports.deletePaymentById = async (id) => {
    const data = await paymentRepo.deletePaymentById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with ID ${id} does not exist!`,
        });
    }
    return data;
};
