const express = require("express");
const router = express.Router();

// Callback for every express routes requires req and res arguments
// Json get rendered at /api/tweets/test
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;