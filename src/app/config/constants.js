"use strict"
exports.accountTableKey={
  firstName:"first_name",
  lastName:"last_name",
  jobTitle:"job_title",
  country:"country",
  city: "city",
  bio: "bio"
}
exports.smsBody = "";
exports.emailBody = "";
exports.fileSize = 1024 * 1024 * 85;

exports.notificationConfirmAccountEmail={

  emailSubject:"(CODETOGEEKS) Account email verification",
  emailContent :process.env.urlBase+"/auth/verification/"
 
}