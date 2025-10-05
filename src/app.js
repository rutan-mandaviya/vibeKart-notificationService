const express = require("express");
const { connect } = require("./broker/broker");

const listner=require("./listner");

const app=express();

app.get("/",(req,res)=>{
    res.status(200).json({
        "message": "Notification Service is Running"
    });
});

module.exports=app;