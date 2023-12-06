const express = require("express");
require('dotenv').config()
const app = express();
const api_route = require('./routes/index');
const cors = require('cors');
const config = require("./config/config");
const cookieParser=require('cookie-parser');
const sequelize = require("./util/database");
app.use(cors({
    origin: ['https://careercompanion.au',
    'http://localhost:3011',
    'http://localhost:5000',
    'https://ai-app-marufbelete.vercel.app',
    'https://ai-app-seven-bice.vercel.app'],
    credentials: true
}));
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api',api_route)

sequelize.sync().then(async(result)=>{
    app.listen(config.PORT || 7000,() => {
      console.log(`Server is running on port ${config.PORT}.`);
    })
  }).catch(error=>{
    console.log(error)
  })

module.exports = app;

