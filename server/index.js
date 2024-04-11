const express =  require("express");
const http = require("http");
const cors = require("cors")
const socket = require("socket.io");

const app = express();

app.use(cors())

app.use("/",(req,res)=>{
    res.send({
        "msg":"Welcome to homepage"
    })
})

const httpServer =  http.createServer(app);

httpServer.listen(3000, async ()=>{
    try{
        console.log("connected to db and server running on port 3000");
    }
    catch(err){
        console.log(err);
    }
})

const io = socket(httpServer);

io.on("connection",(socket)=>{
    console.log("user connected");
})
