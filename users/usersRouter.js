const router = require("express").Router();

const Users = require("../auth/authModel.js");
const { validateUserID, validateUser } = require("../middleware/usersMW");

router.get("/", (req, res) => {
  Users.find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

router.get("/:user_id", validateUserID, (req, res) => {
  let requestedUser = req.params.user_id;

  Users.findById(requestedUser)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "problem retrieving user" });
    });
});

router.delete("/:user_id", validateUserID, (req, res) => {
  let requestedUser = req.params.user_id;

  Users.remove(requestedUser)
    .then((response) => {
      if (response === 0) {
        res.status(500).json({ error: "there was an issue removing the user" });
      } else {
        res
          .status(200)
          .json({ message: `User with ID ${requestedUser} has been deleted` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "there was an issue while removing the user",
        message: error.message,
      });
    });
});

router.put("/:user_id", validateUserID, validateUser, (req, res) => {
  let updatedUser = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: req.params.user_id,
  };

  Users.update(updatedUser.user_id, updatedUser)
    .then((response) => {
      if (response === 0) {
        res.status(500).json({ error: "error while updating user" });
      } else {
        res.status(200).json({ response });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "error while updating user", message: err.message });
    });
});

module.exports = router;
