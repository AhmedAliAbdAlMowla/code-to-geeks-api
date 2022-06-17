"use strict"
let transporter = require("../config/email");

/**
 * @desc      Send email 
 * @param     subject, text, to
 */
exports.sendMail = async (subject, text,html, to) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    subject,
    text:text,
    to,
  };
  if(html != " ")
    mailOptions.html = html; 

  await transporter.sendMail(mailOptions);
};


