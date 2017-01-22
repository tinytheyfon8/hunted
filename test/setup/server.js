var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.use(express.static(path.resolve(__dirname)));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'index.html'));
})

app.listen(8000, () => {
    console.log('listening on 8000');
});