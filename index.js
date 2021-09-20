const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const onlineClients = new Set();
let users = [];
let messages = [];

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.info(`Socket ${socket.id} has connected.`);
  onlineClients.add(socket.id);

  io.to(socket.id).emit('id', socket.id);
  console.log('id enviado', socket.id);

  socket.on("disconnect", () => {
    onlineClients.delete(socket.id);
    users = deleteDisconnectedUser(socket.id);

    io.emit('user join', users);
    console.info(`Socket ${socket.id} has disconnected.`);
  });

  socket.on('user join', (user, time) => {
    users.push([user, socket.id, time]);
    io.emit('user join', users);
    io.emit('chat message', messages);
  });

  socket.on('chat message', (msg, user, id, time) => {
    messages.push([msg, user, id, time]);
    io.emit('chat message', messages);
    console.log(messages);

    console.log(users, 'usuarios');
  });
});

const deleteDisconnectedUser = (id) => {
  return users.filter((user) => {
    return user[1] !== id;
  });
}