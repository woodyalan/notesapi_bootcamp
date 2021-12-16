const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usuario } = require("../bd");
const { palavraChave } = require("../config/token");
let controller = {};

controller.login = async (email, senha) => {
  try {
    const usuario = await controller.getUsuarioByEmail(email);
    const senhaIgual = await bcrypt.compare(senha, usuario.senha);

    if (!senhaIgual) {
      return false;
    }

    return await jwt.sign({ id: usuario.id }, palavraChave, {
      expiresIn: "24h",
    });
  } catch (erro) {}
};

controller.getUsuarioByEmail = async (email) => {
  return await Usuario.scope("login").findOne({
    where: {
      email,
    },
  });
};

controller.getUsuarioById = async (id) => {
  return await Usuario.findByPk(id);
};

module.exports = controller;
