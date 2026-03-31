CREATE DATABASE IF NOT EXISTS astryx_db;
USE astryx_db;

CREATE TABLE IF NOT EXISTS tools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tools (name, description, category, is_premium) VALUES 
('ChatGPT Plus', 'Acceso a GPT-4 y herramientas avanzadas', 'Conversational', true),
('Midjourney', 'Generación de imágenes de alta calidad', 'Image', true),
('Claude 3 Opus', 'El modelo más avanzado de Anthropic', 'Conversational', true);
