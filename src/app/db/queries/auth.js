"use strict"
const defult_profile_image = 'f1fa6164-a26f-438c-be32-482b326eff18';
module.exports.queryList = {

  GET_ACCOUNT_DATA_BY_EMAIL_FOR_RESEND_CONFIRM_EMAIL : `SELECT _id, email, confirmed  FROM account WHERE email = $1`,
  CREATE_ACCOUNT: `INSERT INTO  account(first_name ,last_name  ,email , password ,role ,created_at)
  VALUES($1,$2,$3,$4,'user',CURRENT_TIMESTAMP)`,
  CREATE_OAUTH_ACCOUNT: `INSERT INTO  account(first_name ,last_name ,email ,profile_image_link,  password, role , confirmed , type, created_at)
  VALUES($1,$2,$3,$4,'145*sxtertoken', 'user',true, $5,CURRENT_TIMESTAMP) RETURNING  _id;`,
 
  CHECK_EMAIL_IS_EXIST: ` select exists(select 1 from account where email = $1)`,

  GET_DATA_FOR_SIGNIN: `SELECT _id, first_name, last_name, email,role, password, confirmed, type ,profile_image_link, country, city, job_title , bio,  created_at FROM account WHERE email = $1`,
 

  CHECK_IF_ACCOUNT_ALREADY_VERIFIED: `select exists(select 1 from account where email = $1 AND confirmed = true)`,
  CONFIRM_ACCOUNT_BY_EMAIL: `UPDATE account SET confirmed = true WHERE email =$1 RETURNING  _id, 
  first_name, last_name,email, role,profile_image_link,country, city, job_title , bio,created_at`,
  GET_ACCOUNT_PASSWORD: `SELECT password FROM account WHERE _id= $1`,
  UPDATE_ACCOUNT_PASSWORD: `UPDATE account SET password = $1  WHERE _id=$2`,
  
   //                                       ACCOUNT RECOVERY
   UPDATE_PASSWORD_VERIFICATION_CODE:`UPDATE account SET reset_password_code = $1
   ,reset_password_expires =  (to_timestamp($2/ 1000.0))  WHERE email = $3`,
   CHECH_TOKENT_IS_FIND : `SELECT _id, first_name, last_name,email, role, confirmed, type ,profile_image_link, country, city, job_title as jobTitle, bio,reset_password_expires FROM account where reset_password_code = $1`,
   RESET_ACCOUNT_PASSWORD: `UPDATE account SET password = $1 , reset_password_code= null ,reset_password_expires =null WHERE reset_password_code=$2`,
   
};