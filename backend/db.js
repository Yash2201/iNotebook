const mongoose  = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongoDb = () => {
    mongoose.connect(mongoURI,()=>{
        console.log("connected To Mongodb Successfully");
    })
}

module.exports = connectToMongoDb;