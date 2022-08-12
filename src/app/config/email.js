"use strict";
const nodemailer = require("nodemailer");
/**
 * @desc    Config sender
 */
const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "mail.privateemail.com",
  pool: true,
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
