const express = require("express");
const { getToken } = require("./auth");
const { loggingMiddleware } = require("./logger");

const app = express();
app.use(express.json());

let token;

(async () => {
  token = await getToken();
  global.token = token;
  console.log("Token:", token);
})();

app.get("/", loggingMiddleware("backend", "info", "api"), (req, res) => {
  res.send("Hi");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
