const express=require('express')
const route=express.Router()
const  cover_letter_route= require('./cover_letter.route');

const PATH={
    AI:'/ai',
 
}
route.use(PATH.AI,cover_letter_route)


module.exports=route