const mongoose = require('mongoose');

const Tarefas = mongoose.model('Tarefa', {
    titulo: String,
    descricao : String,
    concluido : Number,
});

module.exports = Tarefas;