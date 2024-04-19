const express = require('express');
const lrouter = express.Router();
const path = require('path');
const LivrosCadastradosDAO  = require('../dao/livrosDAO')


lrouter.get('/livros_cadastrados', (req, res) => {
    const livroDAO = new LivrosCadastradosDAO(connection);
    livroDAO.buscarTodos((error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results);
    });
});


lrouter.post('/livros_cadastrados', (req, res) => {
    const { isbn, titulo, genero, ano_pub, sinopse } = req.body;
    const livroDAO = new LivrosCadastradosDAO(connection);
    livroDAO.criar({ isbn, titulo, genero, ano_pub, sinopse }, (error) => {
        if (error) {
            console.error('Erro ao adicionar livro cadastrado:', error);
            return res.status(500).send('Erro ao adicionar livro cadastrado');
        }
        res.status(200).send('Livro cadastrado adicionado com sucesso');
    });
});


lrouter.put('/livros_cadastrados/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const { titulo, genero, ano_pub, sinopse } = req.body;
    const livroDAO = new LivrosCadastradosDAO(connection);
    livroDAO.atualizar(isbn, { titulo, genero, ano_pub, sinopse }, (error) => {
        if (error) {
            console.error('Erro ao atualizar livro cadastrado:', error);
            return res.status(500).send('Erro ao atualizar livro cadastrado');
        }
        res.status(200).send('Livro cadastrado atualizado com sucesso');
    });
});


lrouter.delete('/livros_cadastrados/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const livroDAO = new LivrosCadastradosDAO(connection);
    livroDAO.deletar(isbn, (error) => {
        if (error) {
            console.error('Erro ao excluir livro cadastrado:', error);
            return res.status(500).send('Erro ao excluir livro cadastrado');
        }
        res.status(200).send('Livro cadastrado excluído com sucesso');
    });
});

module.exports = lrouter;