const { Tickets,Flights , Seats, Airlines, Airports } = require("../../models");

exports.getSeats = async () => {
  const data = await Seats.findAll({
    include: {
      model: Tickets,
      include: [
        {
          model: Airlines,
        },
        {
          model: Airports,
        },
      ],
    },
  });
  return data;
};

exports.getSeatbyId = async (id) => {
  const data = await Seats.findAll({
    where: {
      id,
    },
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
        {
          model: Airports,
        },
      ],
    },
  });

  if (data.length) {
    return data;
  }
  return "data tidak ditemukan";
};

exports.getSeatbyTicket = async (id) => {
  const data = await Seats.findAll({
    where: {
      ticketId:id,
    },
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
        {
          model: Airports,
        }
      ],
    },
  });

  if (data.length) {
    return data;
  }
  return "data tidak ditemukan";
};


exports.createSeat = async (payload) => {
  const data = await Seats.create(payload);
  return data;
};

exports.updateSeat = async (id, payload) => {
  await Seats.update(payload, {
    where: {
      id,
    },
  });

  const data = await Seats.findAll({
    where: {
      id,
    },
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
        {
          model: Airports,
        },
      ],
    },
  });

  return data;
};

exports.deleteSeat = async (id) => {
  // delete from postgres
  await Seats.destroy({ where: { id } });

  return null;
};

exports.deleteSeatbyTicket = async (id) => {
  // delete from postgres
  await Seats.destroy({ where: { ticketId: id } });

  return null;
};