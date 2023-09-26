const express=require('express')
const route=express.Router({ mergeParams: true })
const { generateCoverLetter } = require('../controllers/cover_letter.controller')
const { errorHandler } = require("../middleware/errohandling.middleware");
const { authenticateJWT } = require('../middleware/auth.middleware');

route.post('/coverletter',authenticateJWT,generateCoverLetter,errorHandler)


module.exports=route