const http = require("http");
const app = require("../src/app/app");
const server = http.createServer(app);
const PORT =   process.env.PORT || 4000;

server.listen(PORT, (err) =>
  console.log(err ? err : `Server started on port ${PORT}..✌️✌️ 🥤`)
);
