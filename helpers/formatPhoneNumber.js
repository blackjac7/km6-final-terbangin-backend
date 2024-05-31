const formatPhoneNumber = (phoneNumber) => {
    let sanitizedNumber = phoneNumber.replace(/\D/g, "");

    if (sanitizedNumber.startsWith("0")) {
        sanitizedNumber = "62" + sanitizedNumber.slice(1);
    } else if (sanitizedNumber.startsWith("62")) {
    } else {
        sanitizedNumber = "62" + sanitizedNumber;
    }

    return "+" + sanitizedNumber;
};

module.exports = formatPhoneNumber;
