class LivrosCadastradosDAO {
    constructor(conexao) {
        this.conexao = conexao;
    }

    buscarTodos(retorno) {
        this.conexao.query('SELECT * FROM livros_cadastrados', retorno);
    }

    buscarPorId(isbn, retorno) {
        this.conexao.query('SELECT * FROM livros_cadastrados WHERE isbn = ?', [isbn], retorno);
    }

    criar({ isbn, titulo, genero, ano_pub, sinopse }, retorno) {
        const query = 'INSERT INTO livros_cadastrados (isbn, titulo, genero, ano_pub, sinopse) VALUES (?, ?, ?, ?, ?)';
        this.conexao.query(query, [isbn, titulo, genero, ano_pub, sinopse], retorno);
    }

    atualizar(isbn, { titulo, genero, ano_pub, sinopse }, retorno) {
        const query = 'UPDATE livros_cadastrados SET titulo=?, genero=?, ano_pub=?, sinopse=? WHERE isbn=?';
        this.conexao.query(query, [titulo, genero, ano_pub, sinopse, isbn], retorno);
    }

    deletar(isbn, retorno) {
        this.conexao.query('DELETE FROM livros_cadastrados WHERE isbn=?', [isbn], retorno);
    }
}

module.exports = LivrosCadastradosDAO;