const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("You are on User Routes");
  res.send("You are on Users Route");
});

module.exports = router;
