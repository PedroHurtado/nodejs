import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Activar CORS para permitir conexiones desde cualquier origen
app.use(cors());

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint SSE
app.get('/events', (req, res) => {
  // Configurar headers para SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Enviar un comentario inicial para establecer la conexión
  res.write(': connected\n\n');

  // Enviar eventos cada 2 segundos
  const intervalId = setInterval(() => {
    const data = {
      timestamp: new Date().toISOString(),
      message: 'Mensaje desde el servidor',
      random: Math.floor(Math.random() * 100)
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);

  // Limpiar cuando el cliente cierra la conexión
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

// Endpoint para enviar eventos personalizados
app.get('/notification', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Evento con nombre específico
  const sendNotification = (type, message) => {
    res.write(`event: ${type}\n`);
    res.write(`data: ${JSON.stringify({ message })}\n\n`);
  };

  // Enviar diferentes tipos de notificaciones
  setTimeout(() => sendNotification('info', 'Información importante'), 3000);
  setTimeout(() => sendNotification('warning', 'Advertencia del sistema'), 6000);
  setTimeout(() => sendNotification('success', 'Operación completada'), 9000);

  req.on('close', () => {
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Servidor SSE ejecutándose en http://localhost:${PORT}`);
});