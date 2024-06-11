const { Notifications } = require("../../models");

exports.getNotification = async (id) => {
  const data = await Notifications.findByPk(id);

  if (data) {
    return data;
  }
  return "Notification not found";
};

exports.getNotificationsByUserId = async (userId) => {
  const data = await Notifications.findAll({
    where: { userId },
  });
  return data;
};

exports.getNotificationsByBookingId = async (bookingId) => {
  const data = await Notifications.findAll({
    where: { bookingId },
  });
  return data;
};

exports.createNotification = async (payload) => {
  const data = await Notifications.create(payload);
  return data;
};

exports.updateNotification = async (id, payload) => {
  await Notifications.update(payload, {
    where: { id },
  });

  const data = await Notifications.findByPk(id);
  return data;
};

exports.deleteNotification = async (id) => {
  await Notifications.destroy({ where: { id } });
  return null;
};