"use strict"
exports.queryList = {

  //                                             POST
  GET_ALL_POSTS: `
  SELECT 
  post._id, post.title, post.slug, post.cover, post.excerpt, post.tags, CONCAT(account.first_name , ' ', account.last_name) as  author_name, file.file_link as author_profile_image,  post.created_at 
  FROM post
  inner JOIN account ON post.author = account._id
  left JOIN file ON account.profile_image = file._id
  order by  created_at DESC LIMIT $1 OFFSET $2`,
  GET_ONE_POST_BY_ID : `
  SELECT 
  post._id, post.title, post.slug, post.cover, post.excerpt, post.tags, post.md, CONCAT(account.first_name , ' ', account.last_name) as  author_name,
  file.file_link as author_profile_image, post.tags, post.created_at 
  FROM post 
  inner JOIN account ON post.author= account._id
  left JOIN file ON account.profile_image = file._id
  where post._id = $1`,
  GET_ONE_POST_BY_SLUG : `
  SELECT 
  post._id, post.title, post.slug, post.cover ,post.excerpt, post.tags, post.md, CONCAT(account.first_name , ' ', account.last_name) as  author_name,
  file.file_link as author_profile_image, post.tags, post.created_at 
  FROM post 
  inner JOIN account ON post.author= account._id
  left JOIN file ON account.profile_image = file._id
  where post.slug = $1`,
  GET_ALL_POST_BY_TAG_ID : `
  SELECT  
  post._id, post.title, post.slug, post.cover,post.excerpt,  CONCAT(account.first_name , ' ', account.last_name) as  author_name, file.file_link as author_profile_image, post.tags, post.created_at 
  from post_tag pt
  inner JOIN post ON post._id =pt.post
  inner JOIN account ON post.author= account._id
  left JOIN file ON account.profile_image = file._id
  where pt.tag = $1
  order by  created_at DESC LIMIT $2 OFFSET $3
  `,
  GET_POSTS_COUNT: `SELECT COUNT(*) FROM post`,
  GET_POSTS_COUNT_BY_TAG_ID : `SELECT COUNT(*) FROM post_tag where tag= $1`,
  CHECK_IF_TAG_EXIST : `select exists(select 1 from tag where _id = $1)`,
  CREATE_NEW_POST: `INSERT INTO post(title, slug, cover, excerpt, md, author, tags, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING _id`,
  CREATE_POST_TAG_REL: `INSERT INTO post_tag(post, tag) VALUES($1,$2)`,
  UPDATE_POST_DATA: (id, table, cols) => {
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
  DELETE_POST_BY_ID : `delete from post where _id = $1`,
  DELETE_POST_TAG_REL_BY_POST_ID :  `delete from post_tag where post = $1 `
};