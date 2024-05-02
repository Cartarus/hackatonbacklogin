const { process } = require("grunt");
const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        const connect = await mongoose.connect('mongodb+srv://cartarus28:kGPYx38PQLqDjxxq@hackaton.7o8d9xb.mongodb.net/?retryWrites=true&w=majority&appName=Hackaton');
        console.log(
            "Database Connected: ",
            connect.connection.host, 
            connect.connection.name
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;