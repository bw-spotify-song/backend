function validateSong(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing song data" });
  } else if (!req.body.spotifyID) {
    return res
      .status(400)
      .json({ message: "missing required spotifyID field" });
  } else if (!req.params.user_id) {
    return res.status(400).json({ message: "missing required user_id field" });
  } else {
    next();
  }
}

module.exports = validateSong;
