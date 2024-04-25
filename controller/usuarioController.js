const express = require('express');
const router = express.Router();
const Tarefas = require('../tarefa/tarefa');

router.get('/', async (req, res) => {
    try {
        const tarefas = await Tarefas.find();
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//==

router.post('/', async (req, res) => {
    console.log(req.body);
    const { titulo, descricao, concluido } = req.body;

    const tarefa = {
        titulo, descricao, concluido
    }

    try {
        await Tarefas.create(tarefa);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }

});
//==
router.patch('/:id', async (req, res) => {
    try {
        const ide = req.params.id;

        const { titulo, descricao, concluido } = req.body;
        const taf = {
            titulo, descricao, concluido
        }

        const updateTaf = await Tarefas.updateOne({ _id: ide }, taf);

        if (updateTaf.matchedCount === 0) {
            res.status(422).json({ mensagem:"tarefa nao encontrada"});
            return
        }  
        res.status(200).json(taf);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}); 
//==
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tarefa = await Tarefas.findById({ _id: id });
        if (!tarefa) {
            res.status(422).json({mensagem:"tarefa nao encontrada"});
            return;
        }
        await Tarefas.deleteOne({ _id: id });
        res.status(200).json({mensagem:`Excluído com sucesso!`});
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
//==
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const tarefa = await Tarefas.findById(id); 
        res.json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;