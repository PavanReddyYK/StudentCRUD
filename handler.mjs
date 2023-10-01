import express from 'express';
const app = express()
import './adapter/connectionDB.js';
import http from 'http';

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({"extended":true}))
app.use(bodyParser.json())

import dotenv from 'dotenv';
dotenv.config()

import studentRouter from './routes/studentRoutes.mjs'; // Import the router using ES module syntax
app.use('/v1/student/', studentRouter)


//! Page not found middleware
app.use("*",(req,res,next)=>{
    res.status(404).json({error:true,message:"Page Nott Found!!!"})
})

// ! Error Handling Middleware
app.use( (err,req,res,next)=>{
    res.status(400).json({error:true,message:err.message,data:"ok"})
} )
// ! ---------------Server------------------
app.set('port',process.env.REACT_APP_PORT)
const server = http.createServer(app)

server.listen(app.get('port'),"0.0.0.0",()=>{
    console.log(`Express server listening on http://localhost:${app.get('port')}`)
});



