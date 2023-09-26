const {pool}=require("../Config/db")

const getMe=async(req,res)=>{
let Me=req.user
    res.status(200).json({
        status:true,
       user: Me,
    })
}
module.exports={getMe}