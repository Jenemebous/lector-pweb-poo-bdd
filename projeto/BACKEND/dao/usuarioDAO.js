const db = require('../db/database');

class UsuarioDAO {
    buscarTodos(callback) {
        db.query('SELECT * FROM usuario', (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }

    adicionar(nom_usuario, senha, callback) {
        db.query('INSERT INTO usuario (nom_usuario, senha) VALUES (?, ?)', [nom_usuario, senha], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
    
    buscarPorUsuario(nom_usuario, callback) {
        db.query('SELECT * FROM usuario WHERE nom_usuario = ?', [nom_usuario], (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (rows.length === 0) {
                return callback(null, null); 
            }
            callback(null, rows[0]); 
        });
    }

    atualizar(nom_usuario, novoNome, novaSenha, callback) {
        db.query('UPDATE usuario SET nom_usuario = ?, senha = ? WHERE nom_usuario = ?', [novoNome, novaSenha, nom_usuario], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.affectedRows > 0);
        });
    }

    remover(nom_usuario, callback) {
        db.query('DELETE FROM usuario WHERE nom_usuario = ?', [nom_usuario], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.affectedRows > 0);
        });
    }
}

module.exports = UsuarioDAO;
