

module.exports.getPosts = {
  summary: "get Posts",
  operationId: "get Posts",
  parameters: [
    {
      name: "search",
      in: "query",
      required: false,
      style: "form",
      schema: {
        type: "string",
      },
    },
    {
      name: "state",
      in: "query",
      required: false,
      style: "form",
      schema: { type: "string" },
    },
    {
      name: "pageNumber",
      in: "query",
      required: true,
      style: "form",
      schema: { type: "number" },
      
    },
    {
      name: "pageSize",
      in: "query",
      required: true,
      style: "form",
      schema: { type: "number" },
    },
   
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Post"],
};

module.exports.create = {
  summary: "create new post",
  description: "you can use this end point to create new post. ",
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          title: "test",
          slug: "pl plade1324 ww",
      
          excerpt: "this post explain how to create web page using react.",
          md: "## this is a stmaller title",
          tags: ["c5f7efb7-4a66-4350-bbea-b8627e69d58b"],
        },
      },
    },
  },
  tags: ["Post"],
};

module.exports.update = {
  summary: "update post ",
  description: "you can use this end point to update post. ",
  parameters: [

    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          title: "test",
          slug: "pl plade1324 ww",
          excerpt: "this post explain how to create web page using react.",
          md: "## this is a stmaller title",
          tags: ["c5f7efb7-4a66-4350-bbea-b8627e69d58b"],
          published :"published"
        },
      },
    },
  },
  tags: ["Post"],
};


module.exports.getOnePostByPostId = {
  summary: "get one post by post_id ",
  description: "you can use this end point to  get  one  post by postId",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Post"],
};

module.exports.getOnePostBySlug = {
  summary: "get one post by slug ",
  description: "you can use this end point to  get  one post by slug",
  parameters: [
    {
      name: "slug",
      in: "path",
      required: true,
      style: "form",
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Post"],
};

module.exports.getOnePostByTagId = {
  summary: "get one post by tag id ",
  description: "you can use this end point to  get  one post by tag id",

  parameters: [
    {
      name: "tag_id",
      in: "path",
      required: true,
      style: "form",
      schema: {
        type: "string",
      },
    },

    {
      name: "pageNumber",
      in: "query",
      required: true,
      style: "form",
      schema: { type: "number" },
    },
    {
      name: "pageSize",
      in: "query",
      required: true,
      style: "form",
      schema: { type: "number" },
    },
  ],
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Post"],
};

module.exports.deletePost = {
  summary: "delete post ",
  description: "you can use this end point to delete post .",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Post"],
};


module.exports.uploadPostCoverImage = {
  summary: "upload post cover image",
  description: "you can use this end point to change post cover image.",
  operationId: "",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          required: ["file"],

          properties: {
            file: {
              type: "string",
              format: "base64",
            },
          },
        },
      },
    },
  },
  tags: ["Post"]
};


module.exports.resetPostCoverImage = {
  summary: "reset post cover image",
  description: "you can use this end point to reset post cover image.",
  operationId: "",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  
  tags: ["Post"]
};


//                     love post

module.exports.lovePost = {
  summary: "love post",
  description: "you can use this end point to maker love for post. ",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },

  tags: ["Post"],
}

//                      unlove post
module.exports.unlovePost = {
  summary: "unlove post",
  description: "you can use this end point to maker unlove for post. ",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],


  responses: { 200: { description: "", headers: {} } },
  tags: ["Post"],
}

//                          saved posts
module.exports.getSavedPosts = {
  summary: "get Saved posts",
  description: "you can use this end point to get saved posts.",
  operationId: "get saved posts",
  parameters: [
    {
      name: "pageNumber",
      in: "query",
      required: true,
      style: "form",
      schema: { type: "number" },
    },
    {
      name: "pageSize",
      in: "query",
      required: true,
      style: "form",
      schema: { type: "number" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Post"],
};

module.exports.savePost = {
  summary: "create new saved post",
  description: "you can use this end point to create new saved post. ",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  
  responses: { 200: { description: "", headers: {} } },

  tags: ["Post"],
};

module.exports.unSavedPost = {
  summary: "delete saved post ",
  description: "you can use this end point to delete saved post.",
  parameters: [
    {
      name: "post_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Post"],
};
  