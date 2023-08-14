module.exports.getAboutUs = {
  summary: "get About Us page",
  description: "you can use this end point to  get about us page data",

  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["AboutUs"],
};

module.exports.updateAboutUsParagraphs = {
  summary: "update  About US Paragraphs",
  description: "you can use this end point to update  About Us Paragraphs. ",

  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          mainParagraph: {
            ar: "ادخل النص هنا ",
            en: " Enter text here",
          },
          firstParagraph: {
            ar: "ادخل النص هنا ",
            en: " Enter text here",
          },
          secondParagraph: {
            ar: "ادخل النص هنا ",
            en: " Enter text here",
          },
        },
      },
    },
  },
  tags: ["AboutUs"],
};

module.exports.uploadAboutUsFiles = {
  summary: "upload About Us Files  ",
  description: "you can use this end point to upload About Us Files.",

  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",

          properties: {
            firstFile: { type: "string", format: "base64" },
            secondFile: { type: "string", format: "base64" },
          },
        },
      },
    },
  },
  tags: ["AboutUs"],
};

module.exports.getAboutUsFiles = {
  summary: "get files",
  description: "you can use this end point to  get about as files",

  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["AboutUs"],
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
  tags: ["AboutUs"],
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
  tags: ["AboutUs"],
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
  tags: ["AboutUs"],
};


module.exports.uploadVideo = {
  summary: "upload about us video  ",
  description: "you can use this end point to upload about us video. ",

 
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          required: ["file", "title"],
          properties: {
            file: { type: "string", format: "base64" },
            title: { type: "string" },
          },
        },
        example: [
          { key: "file", type: "file", src: "/E:/file2.jpg" },
          { key: "title", type: "string" },
        ],
      },
    },
  },
  tags: ["AboutUs"],
};
