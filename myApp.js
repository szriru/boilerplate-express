let express = require('express');
const { rmSync } = require('fs');
let app = express();
let path = require('path')
require('dotenv').config();
let bodyParser = require('body-parser')

const mStyle = process.env.MESSAGE_STYLE


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next();
}, (req, res) => {
    res.json({"time": req.time});
});

app.get('/:word/echo', (req, res, next) => {
    const { word } = req.params;
    res.json({"echo": word})
})

app.get('/name', (req, res, next) => {
    const { first: firstname, last: lastname } = req.query;
    res.json({"name": firstname + ' ' + lastname})
})

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false}));







 module.exports = app;
