const express = require("express")
const {signUP,logIn}=require("../controller/authController")

const Router=express.Router()

Router.route('/signup').post(signUP);
Router.route('/login').post(logIn);


module.exports =Router;