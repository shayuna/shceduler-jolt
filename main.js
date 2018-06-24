const express=require("express");
require("./scheduler/scheduler.js");

const app=express();

app.get("*",(req,res,next)=>{
    res.send("ok");
});

app.listen(8080);
