const flightsRepo = require("../../repositories/flight/index");

exports.getFlights = async (key,value, filter, order) => {
  const data = await flightsRepo.getFlights(key,value,filter,order);
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

exports.updateFlight = async (id, payload) => {
  const data = await flightsRepo.updateFlight(id, payload);
  return data;
};

exports.deleteFlight = async (id) => {
  const data = await flightsRepo.deleteFlight(id);
  return data;
};

