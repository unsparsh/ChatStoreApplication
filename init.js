const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
// Connect to MongoDB
main().then(() => {
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let AllChats = [
  
{
    from:"rohit",
    to:"mohit",
    msg:"We are learning backend",
    created_at: new Date() //class of js that crates new date by default
},
{
    from:"anil",
    to:"sunil",
    msg:"we are parents ",
    created_at: new Date() //class of js that crates new date by default
},

];

Chat.insertMany(AllChats);


