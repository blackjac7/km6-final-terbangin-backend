const airlineRepo = require("../../repositories/airline");
const { getAirlineBySerialNumber } = require("../../repositories/airline");

exports.getAirlines = async () => {
  const data = await airlineRepo.getAirlines();
  return data;
};

exports.getAirline = async (id) => {
  const data = await airlineRepo.getAirline(id);
  return data;
};

exports.createAirline = async (payload) => {
  const existingSerialNumber = await getAirlineBySerialNumber(
    payload.serialNumber
  );

  if (existingSerialNumber) {
    throw { statusCode: 400, message: "serial number already used" };
  }

  const data = await airlineRepo.createAirline(payload);
  return data;
};

exports.updateAirline = async (id, payload) => {
  const data = await airlineRepo.updateAirline(id, payload);
  await airlineRepo.getAirline(id);
  return data;
};

exports.deleteAirline = async (id) => {
  const data = await airlineRepo.deleteAirline(id);
  return data;
};
