const express=require('express')
const route=express.Router({ mergeParams: true })
const { generateCoverLetter } = require('../controllers/cover_letter.controller')
const { errorHandler } = require("../middleware/errohandling.middleware");

route.post('/coverletter',generateCoverLetter,errorHandler)


module.exports=route