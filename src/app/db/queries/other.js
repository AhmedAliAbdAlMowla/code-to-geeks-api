"use strict";

const logsTypeEnum = {
  0: "error",
  1: "warning",
  2: "info",
  3: "other",
};
exports.queryList = {
  //                                            LOGS

  INSERT_LOG: (type) => {
    return `INSERT INTO log(path, log_type, description, created_at) VALUES($1,
         '${logsTypeEnum[type]}', $2, CURRENT_TIMESTAMP)`;
  },
};
