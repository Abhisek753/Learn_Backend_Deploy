const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                const userID=decoded.userID
                console.log(decoded)
                req.body.userID=userID
                // console.log(userID)
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        })
    }else {
        res.send({"msg":"Please Login"})

    }
}
module.exports={
    authenticate
}