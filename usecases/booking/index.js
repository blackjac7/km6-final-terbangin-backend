const bookingsRepo = require("../../repositories/booking");
const sendEmail = require("../../config/emailConfig");
const template = require("../../helpers/templateTicket");
const puppeteer = require("puppeteer");

exports.getBookings = async () => {
    const data = await bookingsRepo.getBookings();
    return data;
};

exports.getBookingById = async (id) => {
    const data = await bookingsRepo.getBookingById(id);
    return data;
};

exports.createBooking = async (payload) => {
    const data = await bookingsRepo.createBooking(payload);
    return data;
};

exports.updateBooking = async (id, payload) => {
    const data = await bookingsRepo.updateBooking(id, payload);
    return data;
};

exports.deleteBooking = async (id) => {
    const data = await bookingsRepo.deleteBooking(id);
    return data;
};

exports.generateFlightTicket = async (email, bookingId) => {
    const html = template.emailTemplate(bookingId);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    await sendEmail({
        to: email,
        subject: "Flight Ticket Booking Confirmation",
        html,
        attachments: [
            {
                filename: "FlightTicket.pdf",
                content: pdfBuffer,
                contentType: "application/pdf",
            },
        ],
    });
    console.log("berhasil");
    const data = await bookingsRepo.getBookingById(bookingId);

    return data;
};
