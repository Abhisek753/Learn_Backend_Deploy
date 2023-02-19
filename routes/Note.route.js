const express=require("express")
const {NoteModel}=require("../model/Note.model")
const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find()

    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save()
    res.send({"msg":"Notes is added"})
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id  
     try{
   await NoteModel.findByIdAndDelete({"_id":id})
   res.send({"msg":`Note with id: ${id} has been deleted`})
     }catch(err){
        console.log(err)
        console.log({"msg":"something went wrong"})
     }
   
})

noteRouter.patch("/update/:id",async(req,res)=>{
   const  payload=req.body
   const id=req.params.id  
   const note=await NoteModel.findOne({"_id":id})
   const userID_in_note=note.userID
//    console.log(userID_in_note)
   const userID_making_req=req.body.userID
   
  try{
    if(userID_making_req!==userID_in_note){
        res.send({"msg":"You are not authorized"})
    }else{
        await NoteModel.findByIdAndUpdate({"_id":id},payload)
        res.send("updated")
    }
   
  }catch(err){
    console.log(err)
    res.send({"msg":"Something went wrong"})
  }
   
})
module.exports={
    noteRouter
}


//  63f19c1cfd7551cb9a814fa0