const express=require('express')
const route=express.Router({ mergeParams: true })
const { generateFieldInfo} = require('../controllers/prompt_finder.controller')
const { errorHandler } = require("../middleware/errohandling.middleware");

route.post('/fieldinfo',generateFieldInfo,errorHandler)


module.exports=route