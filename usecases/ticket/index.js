const ticketRepo = require("../../repositories/ticket/index");

exports.getTickets = async () => {
  const data = await ticketRepo.getTickets();
  return data;
};

exports.getTicket = async (id) => {
  const data = await ticketRepo.getTicket(id);
  return data;
};

exports.getTicketsByFlight = async () => {
  const data = await ticketRepo.getTicketsByFlight();
  return data;
};

exports.createTicket = async (payload) => {
  const data = await ticketRepo.createTicket(payload);
  return data;
};

exports.updateTicket = async (id, payload) => {
  const data = await ticketRepo.updateTicket(id, payload);
  return data;
};

exports.deleteTicket = async (id) => {
  const data = await ticketRepo.deleteTicket(id);
  return data;
};