const { Tickets, Flights, Airlines, Airports } = require("../../models");

exports.getTickets = async () => {
  const data = await Tickets.findAll({
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
      ],
    },
  });
  return data;
};

exports.getTicket = async (id) => {
  const data = await Tickets.findAll({
    where: {
      id,
    },
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
      ],
    },
  });

  if (data.length) {
    return data;
  }
  return "data tidak ditemukan";
};

exports.getTicketsByFlight = async () => {
  const tickets = await Tickets.findAll({
    include: Flights,
  });

  // Filter data untuk menghapus duplikat flightId
  const filteredTickets = [];
  const flightIds = new Set();

  tickets.forEach((ticket) => {
    if (!flightIds.has(ticket.flightId)) {
      flightIds.add(ticket.flightId);
      filteredTickets.push(ticket);
    }
  });

  return filteredTickets;
};

exports.createTicket = async (payload) => {
  const data = await Tickets.create(payload);
  return data;
};

exports.updateTicket = async (id, payload) => {
  await Tickets.update(payload, {
    where: {
      id,
    },
  });

  const data = await Tickets.findAll({
    where: {
      id,
    },
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
      ],
    },
  });

  return data;
};

exports.deleteTicket = async (id) => {
  // delete from postgres
  await Tickets.destroy({ where: { id } });

  return null;
};
