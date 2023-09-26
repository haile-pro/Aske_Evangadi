const { Router } = require("express");
const { pool } = require("../Config/db");




const postAnswer=async(req,res)=>{
 let userId=req.user.userId;
 let questionId=req.params.questionId;

//Route

 const {answer,answerCodBlock}=req.body
 if(!answer){
    return res.status(404).json({
        status: false,
        message: "MIssing required fields",
      });
 }

 try {
    await pool.query(`INSERT INTO answer(answer, answerCodBlock,userId,questionId)
     VALUES(?,?,?,?)`,[answer, answerCodBlock,userId,questionId]);
    res.status(200).json({status:true,message:"Answer posted successfully"}) 
 } catch (err) {
    console.log(err.message)
    res.status(500).json({status:false,message:"somethiing went worng"});
  }  
 };
 
 const getAllAnswerwithquestion=async(req,res)=>{
    const questionId =req.params.questionId;
    try {
      let answersAndQuestion=await  pool.query(`
      SELECT answer,answerCodBlock,answerId ,firstName,lastName,email,question
      FROM answer JOIN question ON question.questionId=answer.questionId
      JOIN user ON user.userId=answer.userId WHERE  answer.questionId='${questionId}'
      ORDER BY answer.answerId DESC
      `)  
      res.status(200).json({status:true,total:answersAndQuestion[0].length,answers:answersAndQuestion[0]})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({status:false,message:"somethiing went worng"});
    }
 }
 module.exports={postAnswer,getAllAnswerwithquestion}
