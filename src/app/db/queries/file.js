"use strict"
exports.queryList = {

  //         
CREATE_NEW_FILE: `INSERT INTO file(file_link, s3_key, original_name, extention, created_at) VALUES($1,
						$2, $3, $4, CURRENT_TIMESTAMP)`,
             //                                           FILE
  CREATE_FILE: `INSERT INTO file (folder_id,file_link,s3_key,original_name,extention,created_at) 
  VALUES($1,$2,$3,$4,$5,CURRENT_TIMESTAMP) RETURNING  file_id,created_at;`,
  GET_ALL_FILES: `SELECT file_id,file_link,original_name,extention,created_at FROM file where folder_id=$1 
  order by  created_at DESC LIMIT $2 OFFSET $3`,
  GET_FILES_COUNT: `SELECT COUNT(*) FROM file WHERE folder_id=$1`,
  UPDATE_FILE_NAME: `UPDATE file SET original_name = $1 WHERE file_id=$2`,
  GET_ONE_FILE: `SELECT s3_key FROM file WHERE file_id = $1`,
  DELETE_ONE_FILE: `DELETE FROM file WHERE file_id = $1`,
  GET_MANY_FILE: `SELECT s3_key FROM file WHERE folder_id =$1`,
  DELETE_MANY_FILE: `DELETE FROM file WHERE folder_id = $1`,

};