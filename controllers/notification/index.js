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
        message: `Notification with id ${id} is not found!`,
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
    if (!data) {
      throw {
        statusCode: 404,
        message: `Notifications for userId ${userId} are not found!`,
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
    if (!data) {
      throw {
        statusCode: 404,
        message: `Notifications for bookingId ${bookingId} are not found!`,
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

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getNotificationsByStatusRead = async (req, res, next) => {
  try {
    const { statusRead } = req.params;

    const data = await NotificationUseCase.getNotificationsByStatusRead(
      statusRead
    );
    if (!data) {
      throw {
        statusCode: 404,
        message: `Notifications with statusRead ${statusRead} are not found!`,
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