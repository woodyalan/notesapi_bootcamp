const bcrypt = require("bcrypt");
const { saltos } = require("../config/token");

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "usuario",
      timestamps: false,
      hooks: {
        beforeValidate: (usuario) => {
          if (usuario.senha) {
            usuario.senha = bcrypt.hashSync(usuario.senha, saltos);
          }
        },
      },
      defaultScope: {
        attributes: {
          exclude: ["senha"],
        },
      },
      scopes: {
        login: {
          attributes: ["id", "senha"],
        },
      },
    }
  );

  return Usuario;
};
