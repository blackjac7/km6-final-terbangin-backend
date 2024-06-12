const flightsRepo = require("../../repositories/flight/index");

exports.getFlights = async () => {
  const data = await flightsRepo.getFlights();
  return data;
};

exports.getFlightsbyFilter = async (key, value, filter, order, start, end) => {
  const data = await flightsRepo.getFlightsbyFilter(
    key,
    value,
    filter,
    order,
    start,
    end
  );
  return data;
};

exports.getFlightbyId = async (id) => {
  const data = await flightsRepo.getFlightbyId(id);
  return data;
};

exports.createFlight = async (payload) => {
  const data = await flightsRepo.createFlight(payload);
  return data;
};

exports.decrementFlightCapacity = async (seatclass, value, id) => {
  const data = await flightsRepo.decrementFlightCapacity(seatclass,value,id);
  return data;
}

exports.updateFlight = async (id, payload) => {
  const data = await flightsRepo.updateFlight(id, payload);
  return data;
};

exports.deleteFlight = async (id) => {
  const data = await flightsRepo.deleteFlight(id);
  return data;
};

