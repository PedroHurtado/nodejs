import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(new URL('./public/index.html', import.meta.url).pathname);
});

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('mensaje', (data) => {
    io.emit('mensaje', {
      id: socket.id,
      texto: data.texto,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});