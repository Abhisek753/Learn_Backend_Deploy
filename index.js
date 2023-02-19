const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {noteRouter}=require("./routes/Note.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter)

app.use(authenticate)
app.use("/notes",noteRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to db")
    }catch(err){
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.port}`)
})