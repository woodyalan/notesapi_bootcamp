const express = require("express");
const router = express.Router();

router.get("/:id?", function (req, res) {
  if (req.params.id) {
    res.send("Nota ID " + req.params.id);
  } else {
    res.send("Todas as notas");
  }
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
