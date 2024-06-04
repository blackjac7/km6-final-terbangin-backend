const { PaymentStatus } = require("../../constants/index");

// payment yg ga dibayar lebih dari 10 jam akan expire
exports.calculateExpiryDate = () => {
    const expiryDate = new Date();
    const expiryHour = expiryDate.getHours() + 10;

    if (expiryHour > 23) {
        expiryDate.setDate(expiryDate.getDate() + 1);
        expiryDate.setHours(expiryHour % 24);
    } else {
        expiryDate.setHours(expiryHour);
    }
    return expiryDate;
};

exports.isPaymentExpired = (payment) => {
    const { expire, status } = payment;

    if (status === PaymentStatus.UNPAID) {
        if (new Date() >= expire) {
            return true;
        }
    }
    return false;
};
