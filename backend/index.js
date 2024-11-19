const express = require("express");


const app = express();

const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

app.use(express.json())
var cors = require('cors');
app.use(cors({
    origin: ['http://localhost:5174'],
    methods : ["PUT", "DELETE", "POST", "GET"],
    credentials: true
}))

app.get("/", (req, res)=>{
    console.log("marhaba")
    res.status(200).json({message:"success"})
})
app.post("/record", async(req, res)=>{
    console.log("sent")
    await prisma.leaderboard.create({
        data:{
            username:req.body.username,
            time:req.body.time
        }
    })
    res.status(200).json({message:"success"})
})
app.get("/board", async(req, res)=>{
    const data = await prisma.leaderboard.findMany({
         orderBy: [
    {
      time: 'asc'
    },
  ],
    })
    console.log(data)
    res.status(200).json({data:data})
})
app.post("/checkanswer/:id", (req, res)=>{
    console.log(req.params.id)
    if (req.params.id == 'mario'){
      if (req.body.y >= 896 && req.body.y<=992 && req.body.x >=1122 && req.body.x<= 1175){
        res.status(200).json({answer:"correct"})
      }else if (req.body.x >= 1101 && req.body.x<= 1121 && req.body.y>= 953 && req.body.y <= 976){
        res.status(200).json({answer:"correct"})
      }else if (req.body.x >= 1176 && req.body.x <=1193 && req.body.y >= 939 && req.body.y <= 966){
        res.status(200).json({answer:"correct"})
      }else{
        res.status(200).json({answer:"uncorrect"})
      }
    }

    if (req.params.id == 'boo'){
      // console.log(x, y)
      if (req.body.y >= 1072 && req.body.y <= 1098 ){
        if ( req.body.x >= 393 && req.body.x <=444){
            res.status(200).json({answer:"correct"})
        }
      }else if (req.body.y >= 1099&&req.body.y<= 1121){
        if (req.body.x >=372&&req.body.x <=448){
            res.status(200).json({answer:"correct"})
        }
      }else if (req.body.y >= 1122 && req.body.y <= 1155){
        if (req.body.x >=395 && req.body.x <= 454){
            res.status(200).json({answer:"correct"})
        }
      }else if (req.body.y>= 1156 && req.body.y <= 1181){
          if (req.body.x >= 420 && req.body.x <= 441){
            res.status(200).json({answer:"correct"})
          }
      }else{
        res.status(200).json({answer:"uncorrect"})
      }
    }

    if (req.params.id == 'waluiji'){
      if (req.body.y>= 1788 && req.body.y<=1950 && req.body.x>=902&& req.body.x<=1000){
        res.status(200).json({answer:"correct"})
      }else{
        res.status(200).json({answer:"uncorrect"})
      }
    }
})
app.listen(8000)

