//import dotenv - to load environment variable
require('dotenv').config()
//import express
const express=require('express')
//import cors

const cors=require('cors')
//import router
const router=require('./routes')

//import connection.js
require('./connection')

//create express server
const pfServer=express()
//use of cors to communicate with the view
pfServer.use(cors())
//use json() method-returns amiddleware which can parse json format

pfServer.use(express.json())

//use router

pfServer.use(router)

//to export upload folder from the server side to use in the client side
pfServer.use('/uploads',express.static('./uploads'))
//set port for the server
PORT=4000 || process.env.PORT
//LISTEN TO THE PORT- to resolve the request
pfServer.listen(PORT,()=>{
    console.log(`server running succesfully at port number:${PORT}`);
})
//get request
/* pfServer.get('/',(req,res)=>{
    res.send('get request received')
}) */