const {Users} = require("../../models");
const profileUtils = require("./utils");

exports.getUserById = async (id) => {
    return Users.findByPk(id);
}

exports.getUserByEmail = async (email) => {
    return Users.findOne({where: {email}});
}

exports.getUserByPhoneNumber = async (phoneNumber) => {
    return Users.findOne({where: {phoneNumber}});
}

exports.updateUserById = async (id, payload) => {
    if (payload.picture) {
        payload.picture = await profileUtils.processProfilePicture(payload.picture);
    }
    const updateCount = await Users.update(payload, {where: {id}});

    // kalo ada record yg di update
    if (updateCount > 0) {
        return Users.findByPk(id);
    }
    return null;
}

exports.deleteUserById = async (id) => {
    const toBeDeleted = await Users.findByPk(id);
    await Users.destroy({where: {id}});
    return toBeDeleted;
}