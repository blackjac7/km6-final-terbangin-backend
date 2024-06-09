const NotificationUseCase = require("../../usecases/notification");
const { v4: uuidv4 } = require("uuid");

exports.getNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await NotificationUseCase.getNotification(id);
    if (!data) {
      return next({
        message: `Notification with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNotificationByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await NotificationUseCase.getNotificationsByUserId(userId);
    if (!data) {
      return next({
        message: `Notifications for userId ${userId} are not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNotificationByBookingId = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const data = await NotificationUseCase.getNotificationsByBookingId(
      bookingId
    );
    if (!data) {
      return next({
        message: `Notifications for bookingId ${bookingId} are not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};


exports.createNotification = async (req, res, next) => {
  try {
    const id = uuidv4();
    const { userId, bookingId, title, message, statusRead } = req.body;

    if (!userId || userId == "") {
      return next({
        message: "User ID must be provided!",
        statusCode: 400,
      });
    }
    if (!bookingId || bookingId == "") {
      return next({
        message: "Booking ID must be provided!",
        statusCode: 400,
      });
    }
    if (!title || title == "") {
      return next({
        message: "Title must be provided!",
        statusCode: 400,
      });
    }
    if (!message || message == "") {
      return next({
        message: "Message must be provided!",
        statusCode: 400,
      });
    }

    const data = await NotificationUseCase.createNotification({
      id,
      userId,
      bookingId,
      title,
      message,
      statusRead: statusRead || false,
    });

    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, bookingId, title, message, statusRead } = req.body;

    if (!userId || userId == "") {
      return next({
        message: "User ID must be provided!",
        statusCode: 400,
      });
    }
    if (!bookingId || bookingId == "") {
      return next({
        message: "Booking ID must be provided!",
        statusCode: 400,
      });
    }
    if (!title || title == "") {
      return next({
        message: "Title must be provided!",
        statusCode: 400,
      });
    }
    if (!message || message == "") {
      return next({
        message: "Message must be provided!",
        statusCode: 400,
      });
    }

    const data = await NotificationUseCase.updateNotification(id, {
      userId,
      bookingId,
      title,
      message,
      statusRead,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await NotificationUseCase.deleteNotification(id);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
