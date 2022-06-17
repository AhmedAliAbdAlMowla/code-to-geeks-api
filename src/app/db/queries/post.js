"use strict"
exports.queryList = {

  //                                             POST
  GET_ALL_POSTS: `
  SELECT 
  post._id, post.title, post.slug, post.cover_image_link, post.excerpt, post.tags, CONCAT(account.first_name , ' ', account.last_name) as  author_name, account.profile_image_link as author_profile_image, post.love_count , post.count_minutes_read,   post.created_at 
  FROM post
  inner JOIN account ON post.author = account._id
  where published = $1
  order by  created_at DESC LIMIT $2 OFFSET $3`,
  GET_ONE_POST_BY_ID : `
  SELECT 
  post._id, post.title, post.slug, post.cover_image_link, post.excerpt, post.tags, post.md,post.published, CONCAT(account.first_name , ' ', account.last_name) as  author_name,
  account.profile_image_link as author_profile_image, post.tags, post.love_count , post.share_count, post.count_minutes_read,  post.created_at 
  FROM post 
  inner JOIN account ON post.author= account._id
  where post._id = $1`,
  GET_ONE_POST_BY_SLUG : `
  SELECT 
  post._id, post.title, post.slug, post.cover_image_link ,post.excerpt, post.tags, post.md, CONCAT(account.first_name , ' ', account.last_name) as  author_name,
  account.profile_image_link as author_profile_image, post.tags,  post.love_count , post.share_count, post.count_minutes_read, post.created_at 
  FROM post 
  inner JOIN account ON post.author= account._id
  where post.slug = $1`,
  GET_ALL_POST_BY_TAG_ID : `
  SELECT  
  post._id, post.title, post.slug, post.cover_image_link,post.excerpt,  CONCAT(account.first_name , ' ', account.last_name) as  author_name, account.profile_image_link as author_profile_image, post.tags, post.created_at 
  from post_tag pt
  inner JOIN post ON post._id =pt.post
  inner JOIN account ON post.author= account._id
  where pt.tag = $1
  order by  created_at DESC LIMIT $2 OFFSET $3
  `,
  GET_POSTS_COUNT: `SELECT COUNT(*) FROM post where published = $1`,
  GET_POSTS_COUNT_BY_TAG_ID : `SELECT COUNT(*) FROM post_tag where tag= $1`,
  CHECK_IF_TAG_EXIST : `select exists(select 1 from tag where _id = $1)`,
  CREATE_NEW_POST: `INSERT INTO post(title, slug, excerpt, md, author, tags, created_at) VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING _id`,
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
  DELETE_POST_TAG_REL_BY_POST_ID :  `delete from post_tag where post = $1 `,

  //                              post cover
  GET_POST_COVER_IMAGE_S3_KEY : `SELECT cover_image_s3_key as s3_key FROM post where _id = $1`, 
  UPDATE_POST_COVER_IMAGE:`UPDATE  post SET cover_image_link=$1, cover_image_s3_key=$2 WHERE _id =$3`,
};