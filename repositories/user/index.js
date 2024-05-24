const {User} = require("../../models");
const profileUtils = require("./utils");

exports.getUserById = async (id) => {
    return User.findByPk(id);
}

exports.getUserByEmail = async (email) => {
    return User.findOne({where: {email}});
}

exports.getUserByPhoneNumber = async (phoneNumber) => {
    return User.findOne({where: {phoneNumber}});
}

exports.updateUserById = async (id, payload) => {
    if (payload.picture) {
        payload.picture = await profileUtils.processProfilePicture(payload.picture);
    }
    const updateCount = await User.update(payload, {where: {id}});

    // kalo ada record yg di update
    if (updateCount > 0) {
        return User.findByPk(id);
    }
    return null;
}

exports.deleteUserById = async (id) => {
    const toBeDeleted = await User.findByPk(id);
    await User.destroy({where: {id}});
    return toBeDeleted;
}