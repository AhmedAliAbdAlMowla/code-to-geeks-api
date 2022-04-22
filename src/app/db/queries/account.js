"use strict"

exports.queryList = {
    GET_ALL_ACCOUNT: `SELECT * FROM account`,
    GET_ACCOUNT_BY_EMAIL: `SELECT _id, first_name, last_name, email, confirmed, phone_number FROM account WHERE email = $1`,
    
  GET_ACCOUNT_DATA: `SELECT  first_name ,last_name  ,email, profile_image_link ,  about FROM account 
  WHERE _id =$1`,
  
  UPDATE_ACCOUNT_DATA: (id, table, cols) => {
    let query = ["UPDATE " + table];
    query.push("SET");
    var set = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + " = ($" + (i + 1) + ")");
    });
    query.push(set.join(", "));
    query.push("WHERE _id = " + `'${id}'`);
    return query.join(" ");
  },
  //                                          ACCUNT PROFILE IMAGE
   GET_ACCOUNT_PROFILE_IMAGE:`SELECT profile_image_link FROM account WHERE _id =$1`,
   GET_ACCOUNT_PROFILE_IMAGE_S3_KEY : `SELECT profile_image_s3_key as s3_key FROM account where _id = $1`,
   UPDATE_ACCOUNT_PROFILE_IMAGE:`UPDATE  account SET profile_image_link=$1, profile_image_s3_key=$2 WHERE _id =$3`,
   
};