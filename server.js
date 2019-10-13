const http = require("http");
const app = require("./server/app");
const port = process.env.PORT || 5000;

const dotenv = require('dotenv');
dotenv.config();

app.set(port);

const server = http.createServer(app);

server.on("listening", function() {
  console.log("ok, server is running");

});

server.listen(port, () => console.log(`Running on port: ${port}`));

app.set("port", port);
