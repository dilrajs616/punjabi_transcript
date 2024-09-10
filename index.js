require('dotenv').config();
require('module-alias/register');
const  path = require('path');

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './app/views'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('layouts', 'layouts/layout')

// routes
require('@routes/app.routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Node app listening on port http://localhost:${port}`);
});

