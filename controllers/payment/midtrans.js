const midtransUsecase = require("../../usecases/payment/midtrans");

exports.handleMidtransNotification = async (req, res, next) => {
    try {
        const payload = req?.body;

        const data = await midtransUsecase.handleMidtransNotification(payload);

        // if (data.status === "ISSUED") {
        //     req.io.emit("paymentSuccess", {
        //         message: `Pembayaran berhasil dibayar sebesar`,
        //         highlight: `Rp ${data.totalPrice}`,
        //     });

        //     req.io.emit("seatsUpdate", {
        //         message: "Seats Update",
        //     });
        // } else if (data.status === "CANCELLED") {
        //     req.io.emit("paymentFailed", {
        //         message: `Pembayaran gagal untuk transaksi`,
        //         highlight: `Rp ${data.totalPrice}`,
        //     });
        //     req.io.emit("seatsUpdate", {
        //         message: "Seats Update",
        //     });
        // }

        // req.io.emit("notificationUpdate", {
        //     message: "Notification Update",
        // });

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};
