const express=require("express")
const {postQuestion, getAllQuestions, singleQuestion}=require("../controller/questionController")
const {protect}=require("../controller/authController")

const Router=express.Router()
Router.route("/questions")
.post(protect,postQuestion)
.get(protect,getAllQuestions);

Router.route("/questions/:questionId").get(protect,singleQuestion);


module.exports=Router;