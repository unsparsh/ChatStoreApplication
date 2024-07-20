const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");

// Middleware to serve static files and parse JSON and URL-encoded data
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Connect to MongoDB
main().then(() => {
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Start the server
app.listen(8080, () => {
    console.log("Server is running at 8080");
});

// Define root routes
app.get("/", (req, res) => {
    // res.send("Khamma Ghani Sa :)");
    res.render("main.ejs");
});

//chats page
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{ chats});
});

//create new chat
app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
});

//create route
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to : to,
        msg : msg,
        created_at: new Date(),
    });
     newChat.save()
     .then((res)=>{
        console.log("Chats Saved!");
     }).catch((err)=>{
        console.log(err);
     })
    res.redirect("/chats");
});


//edit request
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//put request for updating the edited message
app.put("/chats/:id" , async (req,res)=>{
    let {id} = req.params;
    let { msg: newMsg } = req.body;

    let updatedChat =await Chat.findByIdAndUpdate(id,{msg:newMsg},
        {runValidators:true , new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});

//delete route
app.delete("/chats/:id" , async (req,res)=>{
    let {id} = req.params;
   let {delChat} = await Chat.findByIdAndDelete(id);
   console.log(delChat);
   res.redirect("/chats");
});