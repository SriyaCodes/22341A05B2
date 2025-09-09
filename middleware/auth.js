const axios = require("axios");

const credentials = {
    "email": "22341a05b2@gmrit.edu.in",
    "name": "m.baby sriya",
    "rollNo": "22341a05b2",
    "accessCode": "eethNe",
    "clientID": "ee3cb12a-e240-4b73-982b-5062fd49a843",
    "clientSecret": "nYvffVnAcGjfJjna"
};

async function getToken() {
  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      credentials
    );
    return res.data.access_token;
  } catch (err) {
    console.error("Auth Error:", err.response?.data || err.message);
  }
}

module.exports = { getToken };
