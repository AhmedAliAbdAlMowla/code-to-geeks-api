"use strict"

exports.queryList = {
    GET_ALL_ACCOUNT: `SELECT * FROM account`,
    GET_ACCOUNT_BY_EMAIL: `SELECT _id, first_name, last_name, email, confirmed FROM account WHERE email = $1`,
    
  GET_ACCOUNT_DATA: `SELECT  first_name ,last_name  ,email, profile_image_link ,  bio FROM account 
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
   //                                        Social Link
   INSERT_SOCIAL_LINK : ` INSERT INTO social_link(author, name, link) VALUES($1, $2,$3)`,
   GET_ALL_SOCIAL_LINKS :`select _id, name, link from social_link where author = $1`,

   //                                         AUTHOR
   GET_AUTHOR_PROFILE_DATA : `SELECT CONCAT(first_name , ' ', last_name) as  author_name,
    profile_image_link as author_profile_image, bio, created_at 
    FROM account 
    where _id = $1`,
    GET_AUTHOR_SOCIAL_LINKS : `select  name, link from social_link where author = $1`,
    GET_LOVE_POSTS: `select post as id from post_love where account = $1  `,
    GET_SAVED_POSTS : `select post_id as id from saved_post where account_id = $1  order by  created_at DESC`
  };
  