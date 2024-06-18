const NotificationUseCase = require("../../usecases/notification");
const isUUID = require("../../helpers/isUUID");
const { v4: uuidv4 } = require("uuid");

exports.getNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || !isUUID(id)) {
      throw {
        statusCode: 400,
        message: "NotificationId must be a valid UUID",
      };
    }

    const data = await NotificationUseCase.getNotification(id);
    if (!data) {
      throw {
        statusCode: 404,
        message: `Notification with id is not found!`,
      };
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

    if (!userId || !isUUID(userId)) {
      throw {
        statusCode: 400,
        message: "UserId must be a valid UUID",
      };
    }

    const data = await NotificationUseCase.getNotificationsByUserId(userId);
    if (!data || data.length === 0) {
      throw {
        statusCode: 404,
        message: `Notifications for userId are not found!`,
      };
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

    if (!bookingId || !isUUID(bookingId)) {
      throw {
        statusCode: 400,
        message: "BookingId must be a valid UUID",
      };
    }

    const data = await NotificationUseCase.getNotificationsByBookingId(
      bookingId
    );
    if (!data || data.length === 0) {
      throw {
        statusCode: 404,
        message: `Notifications for bookingId are not found!`,
      };
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

    if (!userId || !isUUID(userId)) {
      throw {
        statusCode: 400,
        message: "UserID must be provided and must be a valid UUID",
      };
    }
    if (!bookingId || !isUUID(bookingId)) {
      throw {
        statusCode: 400,
        message: "BookingID must be provided and must be a valid UUID",
      };
    }
    if (!title || title.trim() === "") {
      throw {
        statusCode: 400,
        message: "Title must be provided!",
      };
    }
    if (!message || message.trim() === "") {
      throw {
        statusCode: 400,
        message: "Message must be provided!",
      };
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

    if (!id || !isUUID(id)) {
      throw {
        statusCode: 400,
        message: "NotificationId must be a valid UUID",
      };
    }
    if (!userId || !isUUID(userId)) {
      throw {
        statusCode: 400,
        message: "UserID must be provided and must be a valid UUID",
      };
    }
    if (!bookingId || !isUUID(bookingId)) {
      throw {
        statusCode: 400,
        message: "BookingID must be provided and must be a valid UUID",
      };
    }
    if (!title || title.trim() === "") {
      throw {
        statusCode: 400,
        message: "Title must be provided!",
      };
    }
    if (!message || message.trim() === "") {
      throw {
        statusCode: 400,
        message: "Message must be provided!",
      };
    }

    const data = await NotificationUseCase.updateNotification(id, {
      userId,
      bookingId,
      title,
      message,
      statusRead,
    });

    if (!data) {
      throw {
        statusCode: 404,
        message: `Notification with id ${id} not found!`,
      };
    }

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

    if (!id || !isUUID(id)) {
      throw {
        statusCode: 400,
        message: "NotificationId must be a valid UUID",
      };
    }

    const data = await NotificationUseCase.deleteNotification(id);

    if (!data) {
      throw {
        statusCode: 404,
        message: `Notification with notificationId is not found!`,
      };
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const data = await NotificationUseCase.getNotifications();

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Tambahan untuk mengupdate notifikasi berdasarkan userId
exports.updateNotificationsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { bookingId, title, message, statusRead } = req.body;

    if (!bookingId || !isUUID(bookingId)) {
      throw {
        statusCode: 400,
        message: "BookingID must be provided and must be a valid UUID",
      };
    }
    if (!title || title.trim() === "") {
      throw {
        statusCode: 400,
        message: "Title must be provided!",
      };
    }
    if (!message || message.trim() === "") {
      throw {
        statusCode: 400,
        message: "Message must be provided!",
      };
    }

    const data = await NotificationUseCase.updateNotificationsByUserId(userId, {
      bookingId,
      title,
      message,
      statusRead,
    });

    if (!data) {
      throw {
        statusCode: 404,
        message: `Notification with userId are not found!`,
      };
    }

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};


