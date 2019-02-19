const express = require('express');
const path = require('path');
const app = express();


var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

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


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});