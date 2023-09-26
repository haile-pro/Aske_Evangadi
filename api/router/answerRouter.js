const express = require("express")
const {postAnswer, getAllAnswerwithquestion}=require("../controller/answerController")
const {protect}=require("../controller/authController")

const Router=express.Router();

Router.route("/questions/:questionId/answers").post(protect,postAnswer).get(protect,getAllAnswerwithquestion)

module.exports=Router;