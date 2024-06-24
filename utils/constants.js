const PaymentStatus = {
    ISSUED: "ISSUED",
    UNPAID: "UNPAID",
    CANCELLED: "CANCELLED",
};
const clientUrl = process.env.CLIENT_URL;
const Midtrans = {
    SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    SANDBOX_API: process.env.MIDTRANS_SANDBOX_API,
};

module.exports = { PaymentStatus, clientUrl, Midtrans };
