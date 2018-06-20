const express=require("express");
const app=express();


app.use("/",(req,res,next)=>{
    res.send("first step is always the hardest");
});

app.listen(8080);