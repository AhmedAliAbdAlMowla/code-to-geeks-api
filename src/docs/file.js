module.exports.getFiles = {
    summary: "get Files",
    description: "you can use this end point to get files.",
    operationId: "get Files",
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
    tags: ["File"],
  };
  
  module.exports.upload = {
    summary: "upload new file",
    description: "you can use this end point to upload new file. ",
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
    tags: ["File"],
  };
  
  module.exports.update = {
    summary: "update file ",
    description: "you can use this end point to update file. ",
    parameters: [
      {
        name: "file_id",
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
            name: "CSStr",
          },
        },
      },
    },
    tags: ["File"],
  };
  module.exports.getFile = {
    summary: "get one file by file id ",
    description: "you can use this end point to get one  file by file id",
    parameters: [
      {
        name: "file_id",
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
    tags: ["File"],
  };
  
  module.exports.deleteFile = {
    summary: "delete file ",
    description: "you can use this end point to delete file .",
    parameters: [
      {
        name: "file_id",
        in: "path",
        required: true,
        style: "form",
        schema: { type: "string" },
      },
    ],
    responses: { 200: { description: "", headers: {} } },
    tags: ["File"],
  };
  