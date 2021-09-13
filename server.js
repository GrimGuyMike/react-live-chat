/*\
|*|     IMPORTS
\*/

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');

const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const dialogsRouter = require('./routes/api/dialogs');

const socketSetup = require('./socketSetup');

/*\
|*|     MONGODB CONNECTION
\*/

const mongoURI = process.env.MONGO_URI;

mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    err => {
        if(err) throw err;
        console.log('Connected to MongoDB!');
    }
);

/*\
|*|     APP SETUP
\*/

const app = express();
const server = http.createServer(app);
let io = socketio(server);

app
.use(express.json())
.use(cors());

app
.use('/api/users', usersRouter)
.use('/api/auth', authRouter)
.use('/api/dialogs', dialogsRouter);

/*\
|*|     SOCKET.IO EVENTS SETUP
\*/

io = socketSetup(io);

/*\
|*|     SERVING IN PRODUCTION
\*/

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/*\
|*|     SERVER LAUNCH
\*/

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));