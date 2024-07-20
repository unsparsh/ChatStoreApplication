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
    from:"chinsa",
    to:"jaan",
    msg:"Hi hetal, kkrho?",
    created_at: new Date() //class of js that crates new date by default
},
{
    from:"sparsh",
    to:"maa",
    msg:"moms magic kkrho?",
    created_at: new Date() //class of js that crates new date by default
},
{
    from:"rohit",
    to:"mohit",
    msg:"We are learning backend",
    created_at: new Date() //class of js that crates new date by default
},
{
    from:"anil",
    to:"sunil",
    msg:"we are parents of pragati and gori",
    created_at: new Date() //class of js that crates new date by default
},

];

Chat.insertMany(AllChats);


