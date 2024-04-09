const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./urouter');
const path = require('path');



const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use('/', router);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
