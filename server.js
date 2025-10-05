require('dotenv').config();
const { connect } = require('./src/broker/broker');
const app=require("./src/app");

const listener = require('./src/listner');


connect().then(()=>{
    listener();
}).catch((err)=>{
    console.log("Error connecting to RabbitMQ",err);
});
app.listen(3006,()=>{
    console.log("Notification service is running on port 3006");
});