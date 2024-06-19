const { PaymentStatus } = require("../../utils/constants");

// // payment yg ga dibayar lebih dari 10 jam akan expire
// exports.calculateExpiryDate = () => {
//     const expiryDate = new Date();
//     const expiryHour = expiryDate.getHours() + 10;

//     if (expiryHour > 23) {
//         expiryDate.setDate(expiryDate.getDate() + 1);
//         expiryDate.setHours(expiryHour % 24);
//     } else {
//         expiryDate.setHours(expiryHour);
//     }
//     return expiryDate;
// };

// exports.isPaymentExpired = (payment) => {
//     const { expire, status } = payment;

//     if (status === PaymentStatus.UNPAID) {
//         if (new Date() >= expire) {
//             return true;
//         }
//     }
//     return false;
// };

exports.getPaymentStatusFromTransactionStatus = (transactionStatus) => {
    switch (transactionStatus) {
        case ("pending"):
            return PaymentStatus.UNPAID;
        case ("success"):
            return PaymentStatus.ISSUED;
        case ("settlement"):
            return PaymentStatus.ISSUED;
        case ("cancel"):
            return PaymentStatus.CANCELLED;
        case ("expired"):
            return PaymentStatus.CANCELLED;
        default:
            return null;
    }
};
