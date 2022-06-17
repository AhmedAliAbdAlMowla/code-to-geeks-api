module.exports.getHomePage = {
  summary: "get home page data",
  description: "you can use this end point to  get all home page data ",

  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["HomePage"],
};

module.exports.getBanners = {
  summary: "get banner",
  description: "you can use this end point to  get banners",

  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["HomePage"],
};

module.exports.addBanner = {
  summary: "add new  banner",
  description: "you can use this end point to add new  banner. ",
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },

        example: {
          bannerImageBase64:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        },
      },
    },
  },
  tags: ["HomePage"],
};

module.exports.deleteBanner = {
  summary: "delete Banner ",
  description: "you can use this end point to delete banner .",
  parameters: [
    {
      name: "bannerId",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["HomePage"],
};
