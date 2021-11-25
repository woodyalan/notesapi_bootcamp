const { Router } = require("express");
const { Usuario } = require("../bd");
const router = Router();

router.get("/", (req, res) => {
  res.send([]);
});

router.post("/", async (req, res) => {
  const usuario = await Usuario.create(req.body);

  res.send(usuario);
});

router.put("/:id", (req, res) => {
  res.send({});
});

router.delete("/:id", (req, res) => {
  res.send({});
});

module.exports = router;
