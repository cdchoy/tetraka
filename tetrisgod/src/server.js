//server.js

const express = require('express');
const path = require('path');
const port = process.env.PORT || 9000;
const app = express();

app.use(express.static(__dirname));  // __dirname = cd from where the script is running
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/ping', function (req, res) {
    return res.send('pong');
});


app.listen(port);


// const favicon = require('express-favicon');
// app.use(favicon(__dirname + '/build/favicon.ico'));