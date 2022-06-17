"use strict"
exports.queryList = {

  //                                             SAVED POST
  CREATE_NEW_SAVED_POST : `INSERT INTO saved_post(account_id, post_id, created_at) VALUES($1, $2, CURRENT_TIMESTAMP)`,
  
  GET_ALL_SAVED_POSTS: `
  SELECT sp._id, post._id as post_id, post.title, post.slug, post.cover_image_link, 
  post.excerpt, post.tags, CONCAT(account.first_name , ' ', account.last_name) as  author_name,
  account.profile_image_link as author_profile_image,
  post.created_at 
  FROM saved_post sp
  inner JOIN post post ON sp.post_id  = post._id
  inner JOIN account ON post.author = account._id
  where sp.account_id = $1
  order by  created_at DESC LIMIT $2 OFFSET $3`,

  GET_SAVED_POSTS_COUNT: `SELECT COUNT(*) FROM saved_post`,
  
  DELETE_SAVED_POST_BY_ID : `delete from saved_post where _id = $1`,
  
};