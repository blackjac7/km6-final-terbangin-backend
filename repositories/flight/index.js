const { Flights, Airlines, Airports } = require("../../models");

exports.getFlights = async () => {
  const data = await Flights.findAll({
    include: [
      {
        model: Airlines,
      },
      {
        model: Airports,
        as: "StartAirport",
      },
      {
        model: Airports,
        as: "EndAirport",
      },
    ],
  });

  return data;
};

exports.getFlightsbyFilter = async (key, value, filter, order, start, end) => {
  if (key && value) {
    const data = await Flights.findAll({
      order: [[filter, order]],
      where: {
        [key]: value,
      },
      include: [
        {
          model: Airlines,
        },
        {
          model: Airports,
          as: "StartAirport",
          where: {
            city: start,
          },
        },
        {
          model: Airports,
          as: "EndAirport",
          where: {
            city: end,
          },
        },
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
        {
          model: Airports,
          as: "StartAirport",
          where: {
            city: start,
          },
        },
        {
          model: Airports,
          as: "EndAirport",
          where: {
            city: end,
          },
        },
      ],
    });

    if (data.length) {
      return data;
    }
    return "data tidak ditemukan";
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

exports.decrementFlightCapacity = async (seatclass, value, id) => {
  const flight = await Flights.findOne({
    where: { id: id },
    attributes: ["capacity" + seatclass],
  });

  if (!flight) {
    throw new Error(`Flight dengan ID ${id} tidak ditemukan.`);
  }

  const currentCapacity = flight["capacity" + seatclass];
  if (currentCapacity < value) {
    throw new Error(
      `Tidak bisa mengurangi kapasitas sebanyak ${value} karena hanya ada ${currentCapacity} kursi yang tersedia.`
    );
  }

  await Flights.increment(
    { ["capacity" + seatclass]: -value },
    { where: { id: id } }
  );

  return `capacity telah berhasil di kurangi sebanyak ${value}`;
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
