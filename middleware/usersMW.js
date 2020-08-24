const Users = require("../auth/authModel.js");

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  } else if (!req.body.email) {
    return res.status(400).json({ message: "missing required email field" });
  } else if (!req.body.password) {
    return res.status(400).json({ message: "missing required password field" });
  } else if (!req.body.firstName) {
    return res
      .status(400)
      .json({ message: "missing required firstName field" });
  } else if (!req.body.lastName) {
    return res.status(400).json({ message: "missing required lastName field" });
  } else {
    next();
  }
}

function validateUserID(req, res, next) {
  let requestedUser = req.params.user_id;

  Users.findById(requestedUser)
    .then((response) => {
      if (!response) {
        return res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = response;
        next();
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
}

module.exports = { validateUser, validateUserID };
