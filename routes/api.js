const express = require('express');
const mongoose = require('mongoose');


const dbURL = 'mongodb://bilalsaeed232:bilalsaeed232@ds145555.mlab.com:45555/nodejs-chatapp';

mongoose.connect(dbURL, {
    useNewUrlParser: true
}, (err) => {
    console.log("Connection with mongodb!", err);
});


//******* MONGODB MODEL  *************//
let Message = mongoose.model('Message', {
    name: String,
    message: String
});

const api = express.Router();

// define a route to serve those messages to client
api.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})


// to receive messages from clients
api.post('/messages', async (req, res) => {
    if (req.body.name === undefined) return;

    let message = new Message(req.body);


    let saved = await message.save();
    console.log('Saved:', saved);

    let censored = await Message.findOne({
        message: 'badword'
    });

    if (censored) {
        // if censored message found, remove it
        Message.remove({
            _id: censored.id
        });
    } else {
        req.socket.emit('message', message);
    }

    res.sendStatus(200);
});

module.exports = api;