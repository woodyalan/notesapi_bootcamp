const controller = {};
const { Nota, Usuario, Checklist, sequelize } = require("../bd");

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

controller.createNota = async (
  usuarioId,
  titulo,
  descricao,
  checklists = []
) => {
  const transacao = await sequelize.transaction();

  try {
    let nota = await Nota.create(
      {
        usuarioId,
        titulo,
        descricao,
      },
      {
        transaction: transacao,
      }
    );

    let listaCriada = [];

    for (const checklist of checklists) {
      const result = await Checklist.create(
        {
          descricao: checklist.descricao,
          concluida: checklist.concluida,
          notaId: nota.id,
        },
        {
          transaction: transacao,
        }
      );

      listaCriada.push(result);
    }

    nota.dataValues.checklists = listaCriada;

    await transacao.commit();

    return nota;
  } catch (erro) {
    await transacao.rollback();

    console.log(erro);

    throw erro;
  }
};

module.exports = controller;
