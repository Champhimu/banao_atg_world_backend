// const express = require("express")

// importing packages 
import express from 'express'
import cors from 'cors'
import morgan from 'morgan';

import connect from './database/conn.js'; 
import router from './router/route.js';
import post from './router/post.js';

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stack

const port = 8080;

// HTTP GET Request
app.get("/",(req,res) => {
    res.status(201).json("Home GET Request")
});

// api routes
app.use('/api', router)
app.use('/api',post)

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
});

// start server only when we have valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

// start server
// app.listen(port, ()=> {
//     console.log(`Server connected to http://localhost:${port}`)
// })
