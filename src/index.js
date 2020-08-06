const http = require('http');
const path = require('path');


const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// Conexion a la base de datos

mongoose.connect("mongodb+srv://db_angel:Alpha_2020@cluster0.kr2i5.mongodb.net/chat-database?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(db => console.log('db is conected'))
    .catch(err => console.log(err));

// Settings
app.set('port',process.eventNames.PORT || 3000);

require('./sockets')(io);

//console.log(path.join(__dirname,'public'));
// Static files
app.use(express.static(path.join(__dirname,'public')));




// Starting Server
server.listen(process.env.PORT || 3000, () => {
    console.log("server on port ",app.get('port'));
});
