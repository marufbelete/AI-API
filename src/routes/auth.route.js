const express=require('express')
const route=express.Router({ mergeParams: true })
const {registerUser,loginUser, 
logoutUser,checkAuth, getUsers}=require('../controllers/auth.controller')
const {errorHandler}=require('../middleware/errohandling.middleware')
const { authenticateJWT } = require('../middleware/auth.middleware')

route.post('/signup',
    registerUser,
    errorHandler)

route.post('/login',
    loginUser,
    errorHandler)

route.post('/logout',
    logoutUser,
    errorHandler)
    
route.post('/checkauth',
    authenticateJWT,
    checkAuth,
    errorHandler)

route.post('/users',
     getUsers,
    errorHandler)

 module.exports=route