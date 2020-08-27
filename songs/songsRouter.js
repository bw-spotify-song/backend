const router = require("express").Router();

const Songs = require("./songsModel.js");
const { validateUserID } = require("../middleware/usersMW.js");
const validateSong = require("../middleware/songsMW.js");

router.get("/", (req, res) => {
  Songs.find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

router.get("/:user_id", validateUserID, (req, res) => {
  let requestedUser = req.params.user_id;

  Songs.findByUserId(requestedUser)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "problem retrieving songs", message: error.message });
    });
});

router.post("/:user_id", validateUserID, validateSong, (req, res) => {
  let newSong = {
    user_id: req.params.user_id,
    spotifyID: req.body.spotifyID,
  };

  Songs.add(newSong)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "problem retrieving songs", message: error.message });
    });
});

router.delete("/:user_id/:song_id", validateUserID, (req, res) => {
  let requestedSong = req.params.song_id;

  Songs.remove(requestedSong)
    .then((response) => {
      if (response === 0) {
        res.status(500).json({ error: "there was an issue removing the song" });
      } else {
        res
          .status(200)
          .json({ message: `song with ID ${requestedSong} has been deleted` });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "there was an issue while removing the user",
        message: error.message,
      });
    });
});

router.put("/:user_id/:song_id", validateUserID, validateSong, (req, res) => {
  let updatedSong = {
    id: req.params.song_id,
    spotifyID: req.body.spotifyID,
  };

  Songs.update(updatedSong.id, updatedSong)
    .then((response) => {
      if (response === 0) {
        res.status(500).json({ error: "error while updating song" });
      } else {
        res.status(200).json({ response });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "error while updating song", message: error.message });
    });
});

module.exports = router;
