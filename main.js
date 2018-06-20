const express=require("express");
require("./scheduler/scheduler.js");

const app=express();

app.get("*",(req,res,next)=>{
/*
    const database = firebase.database();
    database
    .ref("events").push({
        dt:new Date(2018,5,20,12,50),
        description:"just a simple fucking alert",
        action:"alert('hello world')",
    })
    .then(()=>{
        console.log ("push success");
    })
    .catch((err)=>{
        console.log("err is - ",err);
    });
*/
    res.send("ok1");
});

app.listen(8080);