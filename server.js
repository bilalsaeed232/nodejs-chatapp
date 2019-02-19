const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const http = require('http').Server(app);


var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

//messages object array
let messages = [{
        name: 'Tom',
        message: 'Hi, bilal how are you?'
    },
    {
        name: 'John',
        message: 'Hi, buddy what\'s going on'
    }
];

// define a route to serve those messages to client
app.get('/messages', (req, res) => {
    res.send(messages);
})


// to receive messages from clients
app.post('/messages', (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
});


http.listen(port, () => {
    console.log(`Server started on port ${port}`);
});