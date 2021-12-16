const { Router } = require("express");
const { Nota, Checklist, sequelize } = require("../bd");
const { getNota, getNotas, createNota } = require("../controle/nota");
const router = Router();

router.get("/:id?", async (req, res) => {
  const usuarioId = req.usuarioId;
  const { id } = req.params;

  let resultado = id ? await getNota(id, usuarioId) : await getNotas(usuarioId);

  res.send(resultado);
});

router.post("/", async (req, res) => {
  const usuarioId = req.usuarioId;
  const { titulo, descricao, checklists } = req.body;

  try {
    const nota = await createNota(usuarioId, titulo, descricao, checklist);

    res.send(nota);
  } catch (erro) {
    console.log(erro);

    res.status(500).send({
      erro,
    });
  }
});

router.put("/:id", async (req, res) => {
  const transacao = await sequelize.transaction();
  const { id } = req.params;
  const usuarioId = req.usuarioId;
  const { titulo, descricao, checklists } = req.body;

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
          usuarioId,
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
  const usuarioId = req.usuarioId;
  const transacao = await sequelize.transaction();
  const { id } = req.params;

  try {
    await Checklist.destroy({
      where: {
        notaId: id,
      },
      transaction: transacao,
    });

    const removidas = await Nota.destroy({
      where: {
        id,
        usuarioId,
      },
      transaction: transacao,
    });

    if (removidas == 0) {
      await transacao.rollback();

      res
        .status(404)
        .send({ mensagem: "Nota não encontrada para o seu usuario" });
    } else {
      await transacao.commit();

      res.send(200);
    }
  } catch (erro) {
    await transacao.rollback();

    res.status(500).send({ erro });
  }
});

module.exports = router;
