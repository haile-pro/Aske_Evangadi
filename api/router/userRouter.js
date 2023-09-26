const express=require("express")
const {getMe}=require('../controller/userController')
const {protect}=require("../controller/authController")

const Router=express.Router()
Router.route("/me").get(protect,getMe);

module.exports= Router;