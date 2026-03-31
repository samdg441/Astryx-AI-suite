import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db';
import toolsRoutes from './routes/toolsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Main route
app.use('/api/tools', toolsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Astryx AI Suite API (Express + MySQL + TS)' });
});

// Test DB route
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ message: 'Database connection successful', db_test: rows });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: 'Database connection failed', details: error.message });
    } else {
      res.status(500).json({ error: 'Database connection failed' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
