const express=require('express')
const route=express.Router()
const  cover_letter_route= require('./cover_letter.route');
const  prompt_finder_route= require('./prompt_finder.route');
const  auth_route= require('./auth.route');

const PATH={
    AI:'/ai',
    AUTH:'/auth',
 
}
route.use(PATH.AI,cover_letter_route)
route.use(PATH.AI,prompt_finder_route)
route.use(PATH.AUTH,auth_route)


module.exports=route