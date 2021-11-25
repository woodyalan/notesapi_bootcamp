const { Router } = require("express");
const { Usuario } = require("../bd");
const router = Router();

router.get("/", (req, res) => {
  res.send([]);
});

router.post("/", (req, res) => {
  res.send({});
});

router.put("/:id", (req, res) => {
  res.send({});
});

router.delete("/:id", (req, res) => {
  res.send({});
});

module.exports = router;
