const controller = {};
const { Nota, Usuario, Checklist } = require("../bd");

controller.getNota = async (id, transaction = null) => {
  const result = await Nota.findOne({
    where: {
      id,
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

controller.getNotas = async () => {
  return await Nota.findAll({
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
