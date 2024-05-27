const crypto = require("crypto");
const path = require("path");
const bcrypt = require("bcrypt");
const { user } = require("../../models");
const uploader = require("../../helpers/cloudinary");

exports.getUserByEmail = async (email) => {
  const opt = {
    where: { email },
  };

  const data = await user.findOne(opt);

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

  const data = await user.create(payload);

  return data;
};
