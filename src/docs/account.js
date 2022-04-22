module.exports.getAccountData = {
  summary: "get account data",
  description: "you can use this end point to get account data",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
};

module.exports.updateAccountData = {
  summary: "update account data",
  description: "you can use this end point to update account data. ",

  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          firstName: "feloria",
          lastName: "asta",
          about: "plapla",
        },
      },
    },
  },
  tags: ["Account"],
};

module.exports.uploadAccountProfileImage = {
  summary: "upload account profile image",
  operationId: "",

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
  tags: ["Account"]
};


module.exports.getProfileImage = {
  summary: "get profile image link",
  description: "you can use this end point to profile image link",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
}