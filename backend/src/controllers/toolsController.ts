import { Request, Response } from 'express';
import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getAllTools = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tools');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
};

export const getToolById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tools WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tool' });
  }
};

export const createTool = async (req: Request, res: Response) => {
  try {
    const { name, description, category, is_premium } = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO tools (name, description, category, is_premium) VALUES (?, ?, ?, ?)',
      [name, description, category, is_premium]
    );
    res.status(201).json({ id: result.insertId, name, description, category, is_premium });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tool' });
  }
};
