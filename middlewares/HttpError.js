class HttpError extends Error {
    constructor(payload) {
        super(payload.message);
        this.status = payload.status;
    }
}

module.exports = HttpError;