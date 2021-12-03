const { Router } = require("express");
const { Nota, Checklist, sequelize } = require("../bd");
const { getNota, getNotas } = require("../controle/nota");
const router = Router();

router.get("/:id?", async (req, res) => {
  const { id } = req.params;

  let resultado = id ? await getNota(id) : await getNotas();

  res.send(resultado);
});

router.post("/", async (req, res) => {
  const { usuarioId, titulo, descricao, checklists } = req.body;
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

    res.send(nota);
  } catch (erro) {
    console.log(erro);

    await transacao.rollback();

    res.status(500).send({
      erro,
    });
  }
});

router.put("/:id", async (req, res) => {
  const transacao = await sequelize.transaction();
  const { id } = req.params;
  const { usuarioId, titulo, descricao, checklists } = req.body;

  try {
    await Nota.update(
      {
        usuarioId,
        titulo,
        descricao,
      },
      {
        where: {
          id,
        },
        transaction: transacao,
      }
    );

    if (checklists && checklists.length > 0) {
      for (const indice in checklists) {
        const elemento = checklists[indice];

        if (elemento.id) {
          await Checklist.update(
            {
              descricao: elemento.descricao,
              concluida: elemento.concluida,
            },
            {
              where: {
                id: elemento.id,
              },
              transaction: transacao,
            }
          );
        } else {
          await Checklist.create(
            {
              descricao: elemento.descricao,
              concluida: elemento.concluida,
              notaId: elemento.notaId,
            },
            {
              transaction: transacao,
            }
          );
        }
      }
    }

    const notaAtualizada = await getNota(id, transacao);

    await transacao.commit();

    res.send(notaAtualizada);
  } catch (erro) {
    await transacao.rollback();

    res.send({ erro });
  }
});

router.delete("/:id", async (req, res) => {
  const transacao = await sequelize.transaction();
  const { id } = req.params;

  try {
    await Checklist.destroy({
      where: {
        notaId: id,
      },
      transaction: transacao,
    });

    await Nota.destroy({
      where: {
        id,
      },
      transaction: transacao,
    });

    await transacao.commit();

    res.send(200);
  } catch (erro) {
    await transacao.rollback();

    res.status(500).send({ erro });
  }
});

module.exports = router;
