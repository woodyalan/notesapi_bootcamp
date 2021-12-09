const jwt = require("jsonwebtoken");
const { Usuario } = require("../bd");
const { palavraChave } = require("../config/token");
let controller = {};

controller.login = async (email, senha) => {
  try {
    const usuario = await controller.getUsuarioByEmail(email);

    if (usuario.senha != senha) {
      return false;
    }

    return await jwt.sign({ id: usuario.id }, palavraChave, {
      expiresIn: "24h",
    });
  } catch (erro) {}
};

controller.getUsuarioByEmail = async (email) => {
  return await Usuario.findOne({
    where: {
      email,
    },
  });
};

module.exports = controller;
