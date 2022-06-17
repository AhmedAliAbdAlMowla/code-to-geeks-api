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
          bio: "plapla",
        },
      },
    },
  },
  tags: ["Account"],
};

module.exports.uploadAccountProfileImage = {
  summary: "upload account profile image",
  description: "you can use this end point to change profile image.",
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


//                              SOCIAL_LINK

module.exports.createSocialLink = {
  summary: "create new social link",
  description: "you can use this end point to create new social link. ",
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          name: "github",
          link: "http://plapla.gethub.com"
        
        },
      },
    },
  },
  tags: ["Account"],
};

module.exports.getAllSocialLink = {
  summary: "get all profile social links.",
  description: "you can use this end point to get all profile social links.",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
}


module.exports.deleteSocialLink = {
  summary: "delete social link ",
  description: "you can use this end point to delete social link .",
  parameters: [
    {
      name: "link_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Account"],
};

//                      AUTHOR
module.exports.getAuthorProfiletData = {
  summary: "get author profile data",
  description: "you can use this end point to get author profile data",
  parameters: [
    {
      name: "author_id",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
};


