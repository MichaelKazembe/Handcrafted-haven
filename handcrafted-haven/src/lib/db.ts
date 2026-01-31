import { Pool } from 'pg';

// CONFIGURAÇÃO MANUAL (HARDCODED)
// Isto elimina qualquer dúvida sobre se o .env está a ser lido ou não.
const pool = new Pool({
  user: 'postgres',           // O utilizador padrão
  host: 'localhost',          // O servidor é o seu computador
  database: 'db_handcraft', // O nome que deu ao banco
  password: 'admin', // <--- IMPORTANTE: ESCREVA A SUA SENHA ENTRE AS ASPAS
  port: 5432,                 // A porta padrão
});

// Debug: Vamos ver no terminal se a senha está a ser reconhecida como texto
console.log("--- TENTATIVA DE CONEXÃO ---");
console.log("Password é do tipo:", typeof 'admin'); // Deve aparecer 'string'
console.log("----------------------------");

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};