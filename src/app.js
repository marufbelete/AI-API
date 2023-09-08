const express = require("express");
require('dotenv').config()
const app = express();
const api_route = require('./routes/index');
const cors = require('cors');
const config = require("./config/config");

app.use(cors({
    origin: ['http://localhost:3000',
    'http://localhost:3011',
    'https://ai-app-seven-bice.vercel.app'],
    credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api',api_route)

app.listen(config.PORT,()=>{
console.log(`conncted at port${config.PORT}`)
})
module.exports = app;

