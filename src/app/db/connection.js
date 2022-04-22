"use strict"
const res = require("express/lib/response");
const pool = require("./pool");

exports.query = (queryText, queryParams) => {
    return new Promise((resolve, reject) => {
      pool
        .query(queryText, queryParams)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          err.type ="database";
          reject(err);
        });
    });
 
 
};
