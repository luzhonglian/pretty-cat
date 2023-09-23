const jsonwebtoken = require("jsonwebtoken");
const secret = "dameimao";
const JWT = {
  generate(payload, expire) {
    return jsonwebtoken.sign(payload, secret, { expiresIn: expire });
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};
module.exports = JWT;
