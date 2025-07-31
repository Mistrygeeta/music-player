const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>
        console.log("DB connected successfully")
    )
    .catch((err)=>
        console.log(err)
)
}


module.exports = connectDB;