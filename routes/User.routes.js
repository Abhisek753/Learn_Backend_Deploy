const express=require("express")
const {UserModel}=require("../model/User.model")
const jwt =require("jsonwebtoken")
const bcrypt =require("bcrypt")


const userRouter=express.Router()
userRouter.get("/",async(req,res)=>{
    const user= await UserModel.find()
    res.send(user)
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body
    try{
        bcrypt.hash(pass,4,async(err, hash) =>{
            if(err){
                res.send({"msg":"Something went wrong","err":err.message})
            }else{
                const user=new UserModel({name,email,pass:hash,age})
               await  user.save()
                 res.send({"msg":"User has been registered"})
            }
        });
       
    }catch(err){
    res.send({"msg":"Something went wrong","errr":err.message})
     
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body

    try{
       const user=await UserModel.find({email})
         if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err, result)=> {
                if(result){
                    // let token=jwt.sign({course:"backend"},"masai")
                    let token=jwt.sign({userID:user[0]._id},"masai")

                    res.send({"mess":"Logged in","token":token})
                }else{
                    res.send({"mess":"Wrong Credintial"})

          }
            });
                
          }else{
            res.send({"mess":"Wrong Credintial"})

         }
    }catch(err){
       res.send({"msg":"something went wrong","error":err.message})
    }
 
 
})

userRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id  
     try{
   await UserModel.findByIdAndDelete({"_id":id})
   res.send({"msg":`Note with id: ${id} has been deleted`})
     }catch(err){
        console.log(err)
        console.log({"msg":"something went wrong"})
     }
   
})


module.exports={
    userRouter
}