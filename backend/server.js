import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 


const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'SenhaNF', 
  database: 'cafofo_db'
});

console.log('Conectado com sucesso!');

// CRUD 1 (pra aparecer na tabela do crud 3)
app.get('/api/pets', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pets');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: 'Erro interno ao buscar os animais.' });
  }
});

app.post('/api/pets', async (req, res) => {
  const { imagem, nome, especie, idade, descricao, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO pets (imagem, nome, especie, idade, descricao, status) VALUES (?, ?, ?, ?, ?, ?)',
      [imagem, nome, especie, idade, descricao, status]
    );
    res.status(201).json({
      id: result.insertId,
      imagem,
      nome,
      especie,
      idade,
      descricao,
      status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar pet.' });
  }
});

app.put('/api/pets/:id', async (req, res) => {
  const { id } = req.params;
  const {imagem, nome, especie, idade, descricao, status} = req.body;
  try {
    await db.query(
      'UPDATE pets SET imagem = ?, nome = ?, especie = ?, idade = ?, descricao = ? ,status = ? WHERE id = ?',
      [imagem, nome, especie, idade, descricao, status]
    );
    res.json({
      message: 'Pet atualizado com sucesso!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erro ao atualizar pet.'
    });
  }
});

app.delete('/api/pets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'DELETE FROM pets WHERE id = ?',
      [id]
    );
    res.json({
      message: 'Pet removido com sucesso!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erro ao remover pet.'
    });
  }
});

// CRUD 2: USUÁRIOS (preenchido pro 3 poder ser feito)

// 1. Rota de Leitura (Listar os usuários no CRUD 3)
app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nome FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários do banco:', error);
    res.status(500).json({ error: 'Erro interno ao buscar os usuários.' });
  }
});

// 2. Rota de Criação (Salva novos usuários no banco)
app.post('/api/usuarios', async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const querySql = 'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)';
    const [result] = await db.query(querySql, [nome, email, telefone]);
    res.status(201).json({ id: result.insertId, nome, email, telefone });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
  }
});

// 3. Rota de Edição (Atualiza os dados de um usuário existente)
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  try {
    const querySql = 'UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?';
    await db.query(querySql, [nome, email, telefone, id]);
    res.json({ message: 'Usuário updated com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
  }
});

// 4. Rota de Exclusão (Deleta um usuário do banco)
app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir o usuário.' });
  }
});

// CRUD 3

app.post('/api/adocoes', async (req, res) => {
  const { petId, usuarioId, dataAdocao } = req.body;
  try {
    const querySql = 'INSERT INTO adocoes (petId, usuarioId, dataAdocao) VALUES (?, ?, ?)';
    const [result] = await db.query(querySql, [petId, usuarioId, dataAdocao]);
    res.status(201).json({ id: result.insertId, petId, usuarioId, dataAdocao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar a adoção.' });
  }
});

app.put('/api/adocoes/:id', async (req, res) => {
  const { id } = req.params;
  const { petId, usuarioId, dataAdocao } = req.body;
  try {
    const querySql = 'UPDATE adocoes SET petId = ?, usuarioId = ?, dataAdocao = ? WHERE id = ?';
    await db.query(querySql, [petId, usuarioId, dataAdocao, id]);
    res.json({ message: 'Adoção atualizada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o registro.' });
  }
});

app.delete('/api/adocoes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM adocoes WHERE id = ?', [id]);
    res.json({ message: 'Registro deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o registro.' });
  }
});


// RELATÓRIO COM JOIN 

app.get('/api/relatorio-join', async (req, res) => {
  try {
    const queryJoin = `
      SELECT 
        adocoes.id AS id,
        adocoes.petId AS petId,
        adocoes.usuarioId AS usuarioId,
        adocoes.dataAdocao AS data,
        pets.nome AS nomePet,
        pets.especie AS especiePet
      FROM adocoes
      INNER JOIN pets ON adocoes.petId = pets.id
    `;
    const [rows] = await db.query(queryJoin);
    

    const usuariosMock = {
      1: "Maria Silva (Teste)",
      2: "João Pedro (Teste)",
      3: "Milani (Teste)"
    };

    const dadosFormatados = rows.map(row => ({
      ...row,
      nomeAdotante: usuariosMock[row.usuarioId] || "Adotante Desconhecido"
    }));

    res.json(dadosFormatados);
  } catch (error) {
    console.error('Erro no relatório JOIN:', error);
    res.status(500).json({ error: 'Erro no relatório' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});