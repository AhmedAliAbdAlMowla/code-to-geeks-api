"use strict"
exports.queryList = {

  //                                            SYSTEM
 //                                             LOGS

  GET_LOGS_COUNT: `SELECT COUNT(*) FROM log`,
  GET_ALL_LOGS: `SELECT _id,path, log_type, description, created_at FROM log
  order by  created_at DESC LIMIT $1 OFFSET $2`,
  //                                            posts
  GET_UPDATED_POSTS : `select slug from post where published = true` //where updated_date = CURRENT_DATE

};