"use strict"

const defult_tag = `b8e4cfd0-baf2-43d0-9124-efec13387dd7`;
exports.queryList = {

  //                                             TAG
  CREATE_NEW_TAG : `INSERT INTO tag(name, description, color, created_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP)`,
  GET_ALL_TAG: `
  SELECT 
  _id, name, color, created_at
  FROM tag
  order by  created_at DESC LIMIT $1 OFFSET $2`,
  GET_TAG_COUNT: `SELECT COUNT(*) FROM tag`,
  GET_ONE_TAG_BY_ID : `
  SELECT 
  _id, name, description, color, created_at
  FROM tag w WHERE _id = $1`,

  DELETE_TAG_BY_ID : `delete from tag where _id = $1`,
  UPDATE_POST_TAG_TABLE_BY_DEFULT_TAG : `UPDATE post_tag SET tag = '${defult_tag}' WHERE tag = $1`,
  UPDATE_POSTS_TAGS_WHEN_DELETE_ANY_TAG : (tag_id)  => {
  return(
    `DO
      ${'$$'}DECLARE r record;
      BEGIN
        FOR r IN SELECT _id,tags FROM post where '${tag_id}'  = ANY(tags)
          LOOP
            update post set tags[(select array_position(r.tags, '${tag_id}'))] =
              '${defult_tag}'  where _id=r._id;
          END LOOP; 
      END${'$$'};`);
  },
  UPDATE_TAG_DATA: (id, table, cols) => {
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
};