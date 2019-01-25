const express = require('express');
const path = require('path');
const parser = require('body-parser');
const PORT = 3000;
const app = express();
const routes = require('./routes.js')



app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, '../static')));

app.use('/api', routes);

app.listen(PORT, () => console.log("app is listening to PORT", PORT));
