const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const { users } = require("../../models");
const uploader = require("../../helpers/cloudinary");
const profileUtils = require("./utils");

exports.getUserByEmail = async (email) => {
  const opt = {
    where: { email },
  };

  const data = await users.findOne(opt);

  return data;
};

exports.createUser = async (payload) => {
  payload.password = await bcrypt.hash(payload.password, 10);

  if (payload.picture) {
    const { picture } = payload;

    picture.publicId = crypto.randomBytes(16).toString("hex");

    picture.name = `${picture.publicId}${path.parse(picture.name).ext}`;

    const imageUpload = await uploader(picture);

    payload.picture = imageUpload.secure_url;
  }

  if (payload?.picture) {
    payload.picture = payload?.picture;
  }

  const data = await users.create(payload);

  return data;
};


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
