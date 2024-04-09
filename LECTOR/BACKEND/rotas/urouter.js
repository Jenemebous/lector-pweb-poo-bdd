const express = require('express');
const urouter = express.Router();
const UsuarioDAO = require('./dao/usuarioDAO');
const path = require('path');
const usuarioDAO = new UsuarioDAO();

urouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../LECTOR/login/login.html'));
});

urouter.post('/login', (req, res) => {
    const { nom_usuario, senha } = req.body;
    usuarioDAO.buscarPorUsuario(nom_usuario, (error, usuarioEncontrado) => {
        if (error) {
            console.error('Erro ao buscar usuário:', error);
            return res.status(500).send('Erro ao processar o login');
        }
        if (!usuarioEncontrado) {
            usuarioDAO.adicionar(nom_usuario, senha, (addError) => {
                if (addError) {
                    console.error('Erro ao adicionar usuário ao banco de dados:', addError);
                    return res.status(500).send('Erro ao processar o login');
                }
                req.session.usuario = { nom_usuario, senha };
                res.redirect('/funcoes');
            });
        } else {
            if (senha === usuarioEncontrado.senha) {
                req.session.usuario = usuarioEncontrado;
                res.redirect('/funcoes');
            } else {
                res.status(401).send('Credenciais inválidas');
            }
        }
    });
});

urouter.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../LECTOR/frontend/home.html'));
});

urouter.get('/funcoes', (req, res) => {
    res.sendFile(path.join(__dirname, '../LECTOR/frontend/funcoes.html'));
});

urouter.get('/usuario', (req, res) => {
    usuarioDAO.buscarTodos((error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
        res.status(200).json(resultados);
    });
});

module.exports = urouter;