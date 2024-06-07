const paymentRepo = require("../../repositories/payment/index");
const paymentUtils = require("./utils");
const midtrans = require("./midtrans");
const HttpError = require("../../utils/HttpError");
const { PaymentStatus } = require("../../utils/constants");
const { v4: uuidv4 } = require("uuid");

exports.getPaymentById = async (id, user) => {
    const data = await paymentRepo.getPaymentById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with ID ${id} does not exist!`,
        });
    }
    // cek kalo payment dengan ID tsb. memang milik user yg bersangkutan
    if (data.userId !== user.id) {
        throw new HttpError({
            statusCode: 403,
            message: "Not allowed to access other user's payment(s)!",
        });
    }
    const isExpired = paymentUtils.isPaymentExpired(data);

    if (isExpired) {
        if (data.status !== PaymentStatus.CANCELLED) {
            await paymentRepo.updatePaymentById(id, {
                status: PaymentStatus.CANCELLED,
            });
        }
    }
    return data;
};

exports.getPaymentsByUserId = async (userId, user) => {
    if (userId !== user.id) {
        throw new HttpError({
            statusCode: 403,
            message: "Not allowed to access other user's payment(s)!",
        });
    }
    const data = await paymentRepo.getPaymentsByUserId(userId);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `Payment with user ID ${userId} does not exist!`,
        });
    }
    const isExpired = paymentUtils.isPaymentExpired(data);

    if (isExpired) {
        if (data.status !== PaymentStatus.CANCELLED) {
            await paymentRepo.updatePaymentById(id, {
                status: PaymentStatus.CANCELLED,
            });
        }
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
    const midtransPayment = await midtrans.generateMidtransPayment(payload);
    const { token, redirect_url: link } = midtransPayment;
    payload = { ...payload, link, token };

    return paymentRepo.addPayment(payload);
};

exports.updatePaymentById = async (id, payload) => {
    const { user } = payload;
    const toBeUpdated = await this.getPaymentById(id, user);

    // payment yg statusnya issued atau cancelled udah ga bisa di-update lagi
    if (toBeUpdated.status !== PaymentStatus.UNPAID) {
        return toBeUpdated;
    }
    return paymentRepo.updatePaymentById(id, {
        ...payload,
        updatedAt: new Date(),
    });
};

exports.deletePaymentById = async (id, user) => {
    const toBeDeleted = await this.getPaymentById(id, user);
    await paymentRepo.deletePaymentById(id);
    return toBeDeleted;
};
