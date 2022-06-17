"use strict"
exports.accountTableKey={
  firstName:"first_name",
  lastName:"last_name",
  phoneNumber:"phone_number",
  bio: "bio"
}
exports.smsBody = "";
exports.emailBody = "";
exports.fileSize = 1024 * 1024 * 85;

exports.notificationConfirmAccountEmail={

  emailSubject:"(CODETOGEEKS) Account Confirmation Email",
  emailContent :process.env.urlBase+"api/v1/auth/confirmation/"
 
}