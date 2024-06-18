const { Flights , Seats, Airlines, Airports } = require("../../models");

exports.getSeats = async () => {
  const data = await Seats.findAll({
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
        { model: Airports, as: "StartAirport" },
        { model: Airports, as: "EndAirport" },
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
        { model: Airports, as: "StartAirport" },
        { model: Airports, as: "EndAirport" },
      ],
    },
  });

  if (data.length) {
    return data;
  }
  return "data tidak ditemukan";
};

exports.getSeatbyFlight = async (id) => {
  const data = await Seats.findAll({
    where: {
      flightId: id,
    },
    include: {
      model: Flights,
      include: [
        {
          model: Airlines,
        },
        { model: Airports, as: "StartAirport" },
        { model: Airports, as: "EndAirport" },
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
        { model: Airports, as: "StartAirport" },
        { model: Airports, as: "EndAirport" },
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

exports.deleteSeatbyFlight = async (id) => {
  // delete from postgres
  await Seats.destroy({ where: { flightId: id } });

  return null;
};