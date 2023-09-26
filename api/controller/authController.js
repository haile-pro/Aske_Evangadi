const { pool } = require("../Config/db");
const  bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
//SIGN UP
const signUP = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(404).json({
      status: false,
      message: "MIssing required fields",
    });
  }
  try {
    //checking if theUser exist
    let existingUser = await pool.query(
      `SELECT *FROM user WHERE email='${email}'`
    );
    //console.log(existingUser);
    if (existingUser[0].length != 0) {
      return res
        .status(400)
        .json({ status: false, message: "user alridy Existd in the system" });
    }
 //hashing the  password
 const salt=await  bcrypt.genSalt(10)

 const hashedPassword=await  bcrypt.hash(password,salt)
//  console.log(password);
//  console.log(hashedPassword);


    let savedUser= await pool.query(
      "INSERT INTO user(firstName,lastName,email,password) VALUES(?,?,?,?)",
      [firstName, lastName, email, hashedPassword]
    );
    let userId=savedUser[0].insertId;
    // console.log(savedUser[0].insertId)
    let user={
      firstName,
      lastName,
      lastName,
      email,
      userId,
    }
    //Sign access token
    let token=jwt.sign(user, process.env.TOKEN_SECRET,{expiresIn:"3d"})

    res.status(201).json({
      status:true,
      message:"Seccessfully signed Up",
      accessToken:token
    })
   
  } catch (err) {
    console.log(err.message)
    res.status(500).json({status:false,message:"something went wrong"});
  }
};

const logIn=async(req,res)=>{
 let  {email,password}=req.body;
     if (!email || !password) {
      return res.status(404).json({
        status: false,
        message: "MIssing required fields",
      });
    }

    
    try {
      let foundUser=await pool.query(`SELECT *FROM user  WHERE email=?`,[email,] )
      let user=foundUser[0][0];
      let {password:p,...other}=user;
       console.log(other)

      if(!user|| !(await  bcrypt.compare(password,user.password))){

        return  res.status(403).json({
          status:false,
          message:"Invalid email or password",
        });
      }
      let token=jwt.sign(other, process.env.TOKEN_SECRET,{expiresIn:"3d"});

      res.status(200).json({
        status:true,
        message:"Seccessfully logged In",
        accessToken:token,
      });

      // console.log(user);
      // res.send("cheeking  login...")
    } catch (err) {
      console.log(err.message)
    res.status(500).json({status:false,message:"something went wrong"});
    }
}

const  protect=async(req,res,next)=>{

 let token;
 if(!req.headers.authorization){
  return res
  .status(403)
  .json({status:false,message:"you are not logged in"});
 }

 token=req.headers.authorization.split(" ")[1];


   try {
    const decoded=jwt.verify(token,process.env.TOKEN_SECRET);
    if(!decoded){
      return res
    .status(403)
    .json({status:false,message:"you are not logged in or invalid token"});
   }

   req.user=decoded;
   //console.log(decoded);
   
   next()


   } catch (err) {
    return res
    .status(403)
    .json({status:false,message:"Invalid Token or Token Expired"});
    
   }
  

};


module.exports = { signUP,logIn,protect };
