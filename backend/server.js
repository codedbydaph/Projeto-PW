import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise'; 
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads/'); 
  },
  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,  
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME
});

console.log('Conectado com sucesso!');

// CRUD 1
app.get('/api/pets', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pets');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    res.status(500).json({ error: 'Erro interno ao buscar os animais.' });
  }
});

// Cadastrar Pet
app.post('/api/pets', upload.single('imagem'), async (req, res) => {
  const { nome, especie, idade, descricao, status } = req.body;
  
  const imagemPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.query(
      'INSERT INTO pets (imagem, nome, especie, idade, descricao, status) VALUES (?, ?, ?, ?, ?, ?)',
      [imagemPath, nome, especie, idade, descricao, status]
    );
    res.status(201).json({
      id: result.insertId, imagem: imagemPath, nome, especie, idade, descricao, status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar pet.' });
  }
});
// Editar Pet
app.put('/api/pets/:id', upload.single('imagem'), async (req, res) => {
  const { id } = req.params;
  const { nome, especie, idade, descricao, status } = req.body;
  
  try {
    if (req.file) {
      const imagemPath = `/uploads/${req.file.filename}`;
      await db.query(
        'UPDATE pets SET imagem = ?, nome = ?, especie = ?, idade = ?, descricao = ? ,status = ? WHERE id = ?',
        [imagemPath, nome, especie, idade, descricao, status, id]
      );
    } else {
      await db.query(
        'UPDATE pets SET nome = ?, especie = ?, idade = ?, descricao = ? ,status = ? WHERE id = ?',
        [nome, especie, idade, descricao, status, id]
      );
    }
    res.json({ message: 'Pet atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pet.' });
  }
});

app.delete('/api/pets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM pets WHERE id = ?', [id]);
    res.json({ message: 'Pet removido com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover pet.' });
  }
});

// CRUD 2

// 1. Rota de Leitura (Listar os usuários no CRUD 3)
app.get('/api/usuarios', async (req, res) => {
  try {
    const querySql = `
      SELECT 
        id, 
        nome, 
        sobrenome, 
        endereco, 
        endereco2, 
        cidade, 
        estado, 
        cep 
      FROM usuarios
    `;

    const [rows] = await db.query(querySql);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários do banco:', error);
    res.status(500).json({ error: 'Erro interno ao buscar os usuários.' });
  }
});

// 2. Rota de Criação (Salva novos usuários no banco)

app.post('/api/usuarios', async (req, res) => {
  // Captura os dados que o frontend enviou
  const { nome, sobrenome, email, endereco, cidade, estado, cep } = req.body;

  try {
    const queryVerificar = 'SELECT id FROM usuarios WHERE email = ?';
    const [usuariosExistentes] = await db.query(queryVerificar, [email]);

    if (usuariosExistentes.length > 0) {
      console.log(`Usuário com o e-mail ${email} já existe. Retornando ID existente.`);
      return res.status(200).json({ 
        id: usuariosExistentes[0].id, 
        message: 'Usuário já cadastrado anteriormente.' 
      });
    }
    const queryInserir = `
      INSERT INTO usuarios (nome, sobrenome, email, endereco, cidade, estado, cep) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.query(queryInserir, [
      nome, 
      sobrenome || '', 
      email, 
      endereco || 'Não informado', 
      cidade || 'Não informado', 
      estado || 'DF', 
      cep || '00000-000'
    ]);

    res.status(201).json({ id: result.insertId, nome, email });

  } catch (error) {
    console.error('Erro ao processar o cadastro de usuário:', error);
    res.status(500).json({ error: 'Erro interno ao salvar o usuário.' });
  }
});

// 3. Rota de Edição (Atualiza os dados de um usuário existente)
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, endereco, endereco2, cidade, estado, cep } = req.body;

  try {
    const querySql = `
      UPDATE usuarios 
      SET 
        nome = ?, 
        sobrenome = ?, 
        endereco = ?, 
        endereco2 = ?, 
        cidade = ?, 
        estado = ?, 
        cep = ? 
      WHERE id = ?
    `;

    await db.query(querySql, [
      nome,
      sobrenome,
      endereco,
      endereco2,
      cidade,
      estado,
      cep,
      id
    ]);

    res.json({ message: 'Usuário atualizado com sucesso!' });
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
        pets.especie AS especiePet,
        usuarios.nome AS nomeAdotante,
        usuarios.sobrenome AS sobrenomeAdotante
      FROM adocoes
      INNER JOIN pets ON adocoes.petId = pets.id
      INNER JOIN usuarios ON adocoes.usuarioId = usuarios.id
    `;

    const [rows] = await db.query(queryJoin);

    res.json(rows);
  } catch (error) {
    console.error('Erro no relatório JOIN:', error);
    res.status(500).json({ error: 'Erro no relatório' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});