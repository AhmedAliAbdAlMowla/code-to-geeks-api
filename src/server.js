const req = require("express/lib/request");
const http = require("http");
const app = require("../src/app/app");
const server = http.createServer(app);
const PORT = 4000 || process.env.PORT;


server.listen(PORT, (err) =>
  console.log(err ? err : `Server started on port ${PORT}..✌️✌️ 🥤`)
);