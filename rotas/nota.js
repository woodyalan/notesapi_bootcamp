const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send([]);
});

router.post("/", function (req, res) {
  res.send({});
});

router.put("/:id", function (req, res) {
  res.send({});
});

router.delete("/:id", function (req, res) {
  res.send({});
});

module.exports = router;
