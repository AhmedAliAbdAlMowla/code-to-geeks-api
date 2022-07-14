module.exports.getAccountData = {
  summary: "Get account profile data",
  description: "you can use this end point to get account profile data",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
};

module.exports.updateAccountData = {
  summary: "Update account profile data",
  description: "you can use this end point to update account profile data. ",

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
          country:  "Egypt",
          city: "ALEX",
          jobTitle: "software engineer",
          bio: "plapla",
        },
      },
    },
  },
  tags: ["Account"],
};

module.exports.uploadAccountProfileImage = {
  summary: "Upload account profile image",
  description: "you can use this end point to change account profile image.",
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
  summary: "Get account profile image link",
  description: "you can use this end point to account profile image link",
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
  summary: "Create new social link [Author]",
  description: "you can use this end point to create new social link.",
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
  summary: "Get author account profile social links [Author]",
  description: "you can use this end point to get all author account profile social links.",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
}


module.exports.deleteSocialLink = {
  summary: "Delete social link [Author]",
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
  summary: "Get author account profile data [Author]",
  description: "you can use this end point to get author account profile data",
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


//                  interactions

module.exports.getInteractions = {

  summary: "Get account interactions.",
  description: "you can use this end point to get account interactions.",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Account"],
}