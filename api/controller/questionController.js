
const {pool}=require("../Config/db");


const postQuestion=async(req,res)=>{
const {question,questionDescription,questionCodBlock,tags}=req.body;

const userId=req.user.userId

if(!question){
     return res
    .status(200)
    .json({status:false,message:"Missing required field"});

}
try {
    await pool.query(`INSERT INTO question(question,
        questionDescription,questionCodBlock,
        tags,userId)VALUES(?,?,?,?,?)`,[question,questionDescription,
            questionCodBlock,tags,userId]);
            res.status(201).json({status:true,message:"Question posted successfully"})

} catch (err) {
    console.log(err.message)
    res.status(500).json({status:false,message:"somethiing went worng"})
    
}

    //protect,postQuestion
};


const getAllQuestions=async(req,res)=>{
  try {
    let questions=await pool.query(`SELECT  questionId,question,questionDescription,questionCodBlock,tags,firstName,lastName,email FROM question JOIN user ON question.userId=user.userId ORDER BY questionId DESC`);
    res.status(200).json({status:true,total:questions[0].length,questions:questions[0]});
  } catch (err) {
    console.log(err.message)
    res.status(500).json({status:false,message:"somethiing went worng"})
    
  }
}
const singleQuestion=async(req,res)=>{

    let questionId=req.params.questionId;
  try {
     let question=await pool.query(`SELECT  questionId,question,questionDescription,questionCodBlock,tags,firstName,lastName,email FROM question JOIN user ON question.userId=user.userId WHERE
     questionId='${questionId} '`)
     
     res.status(200).json({status:true,question:question[0][0]})
  } catch (err) {
    console.log(err.message)
    res.status(500).json({status:false,message:"somethiing went worng"})
  } 
}


module.exports={postQuestion,getAllQuestions,singleQuestion}