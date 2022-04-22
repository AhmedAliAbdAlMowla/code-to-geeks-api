module.exports.getAllMessages = {
  summary: "get all messages",
  description: "you can use this end point to   get all messages",
  responses: {
    200: {
      description: "",
      headers: {},
    },
  },
  tags: ["Message"],
};

module.exports.getOneMessage = {
  summary: "get one Message",
  description: "you can use this end point to  get  one  Message by messageId",
  parameters: [
    {
      name: "messageId",
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
  tags: ["Message"],
};

module.exports.createMessage = {
  summary: "create new Message",
  description: "you can use this end point to create new Message. ",
  responses: { 200: { description: "", headers: {} } },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
        example: {
          senderName: "ahmed",
          email: "ahmedabdalmola@gmail.com",
          messageContent: "اريد التواصل معكم ",
        },
      },
    },
  },
  tags: ["Message"],
};

module.exports.deleteMessage = {
  summary: "delete Message ",
  description: "you can use this end point to create new Message.",
  parameters: [
    {
      name: "messageId",
      in: "path",
      required: true,
      style: "form",
      schema: { type: "string" },
    },
  ],
  responses: { 200: { description: "", headers: {} } },
  tags: ["Message"],
};
