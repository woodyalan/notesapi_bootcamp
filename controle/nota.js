const controller = {};
const { Nota, Usuario, Checklist } = require("../bd");

controller.getNota = async (id, usuarioId, transaction = null) => {
  const result = await Nota.findOne({
    where: {
      id,
      usuarioId,
    },
    include: [
      {
        model: Usuario,
        as: "usuario",
      },
      {
        model: Checklist,
        as: "checklists",
      },
    ],
    transaction,
  });

  return result;
};

controller.getNotas = async (usuarioId) => {
  return await Nota.findAll({
    where: {
      usuarioId,
    },
    include: [
      {
        model: Usuario,
        as: "usuario",
      },
      {
        model: Checklist,
        as: "checklists",
      },
    ],
  });
};

module.exports = controller;
