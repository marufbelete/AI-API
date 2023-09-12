const express=require('express')
const route=express.Router({ mergeParams: true })
const { generateFieldInfo,getAllField,getAllTrainingForField} = require('../controllers/prompt_finder.controller')
const { errorHandler } = require("../middleware/errohandling.middleware");

route.post('/fieldinfo',generateFieldInfo,errorHandler)
route.get('/fields',getAllField,errorHandler)
route.get('/trainings',getAllTrainingForField,errorHandler)


module.exports=route