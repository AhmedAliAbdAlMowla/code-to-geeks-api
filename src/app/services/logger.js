"use strict"
const otherSqlQuery = require("../db/queries/other").queryList;

/**
 * @desc      System logger  
 * @param     type, path, description
 */

exports.log = async (type=4, path ="", description="") => {
const dbConnection = require("../db/connection");
   //  insert log data 
    await dbConnection.query(otherSqlQuery.INSERT_LOG(type), [path,description.substring(0,990)]);
return;
};
