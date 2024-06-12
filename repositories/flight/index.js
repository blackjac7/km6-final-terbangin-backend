const { Flights, Airlines, Airports } = require("../../models");

exports.getFlights = async (key, value, filter, order) => {
  if (key && value) {
    const data = await Flights.findAll({
      order:[[filter , order]],
      where: {
        [key]: value,
      },
      include: [
        {
          model: Airlines,
        },
        { model: Airports, as: "StartAirport" },
        { model: Airports, as: "EndAirport" },
      ],
    });

  if (data.length) {
    return data;
  }
  return "data tidak ditemukan";
  } else {
    const data = await Flights.findAll({
      order: [[filter, order]],
      include: [
        {
          model: Airlines,
        },
        { model: Airports, as: "StartAirport" },
        { model: Airports, as: "EndAirport" },
      ],
    });
    return data;
  }
};

exports.getFlightbyId = async (id) => {
  const data = await Flights.findAll({
    where: {
      id,
    },
    include: [
      {
        model: Airlines,
      },
      { model: Airports, as: "StartAirport" },
      { model: Airports, as: "EndAirport" },
    ],
  });

  if (data.length) {
    return data;
  }
  return "data tidak ditemukan";
};

exports.createFlight = async (payload) => {
  const data = await Flights.create(payload);
  return data;
};

exports.updateFlight = async (id, payload) => {
  await Flights.update(payload, {
    where: {
      id,
    },
  });

  const data = await Flights.findAll({
    where: {
      id,
    },
    include: [
      {
        model: Airlines,
      },
      { model: Airports, as: "StartAirport" },
      { model: Airports, as: "EndAirport" },
    ],
  });

  return data;
};

exports.deleteFlight = async (id) => {
  // delete from postgres
  await Flights.destroy({ where: { id } });

  return null;
};
