const userRepo = require("../../repositories/user");
const HttpError = require("../../middlewares/HttpError");

exports.getProfileById = async (id) => {
    const data = await userRepo.getUserById(id);

    if (!data) {
        throw new HttpError({
            status: 404,
            message: `User with ID ${id} does not exist!`,
        });
    }
    return data;
}

exports.updateProfileById = async (id, payload) => {
    const data = await userRepo.updateUserById(id, payload);

    if (!data) {
        throw new HttpError({
            status: 404,
            message: `User with ID ${id} does not exist!`,
        });
    }
    return data;
}

exports.deleteProfileById = async (id) => {
    const data = await userRepo.deleteUserById(id);

    if (!data) {
        throw new HttpError({
            status: 404,
            message: `User with ID ${id} does not exist!`,
        });
    }
    return data;
}