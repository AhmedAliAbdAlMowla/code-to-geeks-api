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
    tags: ["Saved Post"],
  };
  
  module.exports.create = {
    summary: "create new saved post",
    description: "you can use this end point to create new saved post. ",
    responses: { 200: { description: "", headers: {} } },
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
          example: {
            postId: "0ea06425-a3bc-4304-b439-fc7d584c9e39"
          },
        },
      },
    },
    tags: ["Saved Post"],
  };
  
  module.exports.deleteSavedPost = {
    summary: "delete saved post ",
    description: "you can use this end point to delete saved post.",
    parameters: [
      {
        name: "saved_post_id",
        in: "path",
        required: true,
        style: "form",
        schema: { type: "string" },
      },
    ],
    responses: { 200: { description: "", headers: {} } },
    tags: ["Saved Post"],
  };
    