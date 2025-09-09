const axios = require("axios");

async function Log(stack, level, pkg, message, token) {
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    console.error("Log Error:", err.response?.data || err.message);
  }
}

function loggingMiddleware(stack, level, pkg) {
  return async (req, res, next) => {
    const token = req.token || global.token;
    await Log(stack, level, pkg, `Request to ${req.path}`, token);
    next();
  };
}

module.exports = { Log, loggingMiddleware };
