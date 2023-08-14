module.exports.getTags = {
  summary: "get tags",
  description: "you can use this end point to get tags.",
  operationId: "get tags",
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
  tags: ["Tag"],
};

module.exports.create = {
  summary: "create new tag",
  description: "you can use this end point to create new tag. ",
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          name: " CSStr",
          description: "aoioodoio",
          color: "#1bb184",
        },
      },
    },
  },
  tags: ["Tag"],
};

module.exports.update = {
  summary: "update tag ",
  description: "you can use this end point to update tag. ",
  parameters: [
    {
      name: "tag_id",
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
          name: " CSStr",
          description: "aoioodoio",
          color: "#1bb184",
        },
      },
    },
  },
  tags: ["Tag"],
};
module.exports.getOneTagByTagId = {
  summary: "get one post by tag_id ",
  description: "you can use this end point to  get  one  post by tagId",
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
  ],
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Tag"],
};

module.exports.deleteTag = {
  summary: "delete tag ",
  description: "you can use this end point to delete tag .",
  parameters: [
    {
      name: "tag_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Tag"],
};
