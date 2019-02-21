const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))




app.use('/api', (req, res, next) => {
    req.socket = io;
    next();
})
app.use('/api', api);


io.on('connection', () => {
    console.log("A new user is connected!!!");
})


http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});