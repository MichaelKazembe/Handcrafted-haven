import { Pool } from 'pg';

// MANUAL CONFIGURATION (HARDCODED)
// This removes any doubt about whether the .env file is being read or not.
const pool = new Pool({
  user: 'postgres',           // The default user
  host: 'localhost',          // The server is your local machine
  database: 'db_handcraft',   // The name you gave to the database
  password: 'admin',          
  port: 5432,                 // The default port
});

// Debug: Let's check in the terminal if the password is being recognized as text
console.log('--- CONNECTION ATTEMPT ---');
console.log('Password type is:', typeof 'admin'); // Should display 'string'
console.log('--------------------------');

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
