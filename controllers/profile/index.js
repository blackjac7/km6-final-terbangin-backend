const profileUsecase = require("../../usecases/profile");

exports.getProfileById = async (req, res, next) => {
    try {
        const userId = req?.params.id;
        const data = await profileUsecase.getProfileById(userId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
}

exports.updateProfileById = async (req, res, next) => {
    try {
        const userId = req?.params.id;
        let payload = req?.body;

        if (req.files) {
            const {picture} = req.files;
            payload = {...payload, picture};
        }
        const data = await profileUsecase.updateProfileById(userId, payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
}

exports.deleteProfileById = async (req, res, next) => {
    try {
        const userId = req?.params.id;
        const data = await profileUsecase.deleteProfileById(userId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
}