const dbConnection = require("../db/connection");
const systemSqlQuery = require("../db/queries/system").queryList;

/**
 * @desc    Get all  logs
 * @route   GET /api/v1/sys/log
 * @access  Private [admin ]
 */
module.exports.getAllLogs = async (req, res) => {
  // pagination element
  const pageNumber = parseInt(req.query.pageNumber, 10);
  const pageSize = parseInt(req.query.pageSize, 10);

  let total = await dbConnection.query(systemSqlQuery.GET_LOGS_COUNT);
  total = total.rows[0].count;

  let logs = await dbConnection.query(systemSqlQuery.GET_ALL_LOGS, [
    pageSize,
    (pageNumber - 1) * pageSize,
  ]);

  logs = logs.rows;

  res.status(200).json({
    payload: {
      total: parseInt(total, 10),
      logs,
    },
    message: "Logs data retrieved successfully.",
  });
};

/**
 * @desc    Get all posts (slugs)
 * @route   GET /api/v1/sys/post/slugs
 * @access  public
 */
module.exports.getPostsSlugs = async (req, res) => {
  let posts = await dbConnection.query(systemSqlQuery.GET_UPDATED_POSTS, []);

  posts = posts.rows;

  res.status(200).json({
    payload: {
      total: posts.length,
      posts,
    },
    message: "Posts data retrieved successfully.",
  });
};
