const midtransUsecase = require("../../usecases/payment/midtrans");

exports.handleMidtransNotification = async (req, res, next) => {
    try {
        const payload = req?.body;
        let seatsArray = [];
        req.io.on("seatsData", (seats) => {
            seatsArray = seats;
        });
        const data = await midtransUsecase.handleMidtransNotification(payload);

        if (data.status === "ISSUED") {
            req.io.emit("paymentSuccess", {
                message: `Pembayaran berhasil dibayar sebesar`,
                totalPrice: `Rp ${data.totalPrice}`,
            });
        } else if (data.status === "CANCELLED") {
            req.io.emit("paymentFailed", {
                message: `Pembayaran gagal untuk transaksi`,
                totalPrice: `Rp ${data.totalPrice}`,
            });
        }

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};
