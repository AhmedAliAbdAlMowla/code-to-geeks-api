"use strict"
exports.queryList = {

  //                                            FILE
      
  INSERT_FILE: `INSERT INTO file(file_link, s3_key, original_name, extention, created_at) VALUES($1,
    $2, $3, $4, CURRENT_TIMESTAMP)RETURNING  _id;`,
  GET_FILES_COUNT: `SELECT COUNT(*) FROM file`,
  GET_ALL_FILES: `SELECT _id,file_link, original_name, extention, created_at FROM file
  order by  created_at DESC LIMIT $1 OFFSET $2`,
  GET_FILE: `SELECT file_link, original_name, extention, created_at FROM file WHERE _id = $1`,
  UPDATE_FILE_NAME: `UPDATE file SET original_name = $1 WHERE _id=$2`,
  DELETE_FILE: `DELETE FROM file WHERE _id = $1 RETURNING  s3_key`,


};