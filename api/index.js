const express=require("express");
require('dotenv').config();
const {pool}= require("./Config/db");
const {userTable,questionTable,answerTable}=require("./model.js/model")
//ROUTERS Importing
const  authRouter =require('./router/authRouter')
const questionRouter=require("./router/questionsRouter")
const answerRouter=require("./router/answerRouter")
const userRouter=require("./router/userRouter")
//const {protect}=require('./controller/authController')

const server=express();

let port=process.env.PORT ||5500;
//middel wire
server.use(express.json());


//Router
server.use("/api/v1",authRouter);
server.use("/api/v1",questionRouter);
server.use("/api/v1",answerRouter);
server.use("/api/v1",userRouter);
//test
// server.get(
//     "/test",
//     protect,
//     (req,res,next)=>{
//     console.log("firstfunction");
//     next();
// res.send("testing");
// },
//     (req,res,next)=>{
//         console.log("seconfunction");
// });

const startApp= async(port)=>{
    //establishing the connection
    const connection =await pool.getConnection();
    console.log("Database Connection Established!");

    try{
        //createing the tables
         await connection.query(userTable)
         await connection.query(questionTable)
         await connection.query(answerTable)
         console.log('All TEABLES ARE  CREATED');

        //starting the server
        server.listen(port, console.log(`server is running on port ${port}`));
    
    } catch(err){
        console.log(err.message);
        connection.release();
    }
}

// pool
// .getConnection()
// .then(()=>console.log("connected" ))
// .catch((err)=>console.log(err))

startApp(port)


