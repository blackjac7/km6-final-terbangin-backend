const bookingsRepo = require("../../repositories/booking/index");

exports.getBookings = async () => {
  const data = await bookingsRepo.getBookings();
  return data;
};

exports.getBookingById = async (id) => {
  const data = await bookingsRepo.getBookingById(id);
  return data;
};

exports.createBooking = async (payload) => {
  const data = await bookingsRepo.createBooking(payload);
  return data;
};

exports.updateBooking = async (id, payload) => {
  const data = await bookingsRepo.updateBooking(id, payload);
  return data;
};

exports.deleteBooking = async (id) => {
  const data = await bookingsRepo.deleteBooking(id);
  return data;
};
