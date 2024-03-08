const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
        });
        console.log('Database connected');
    }catch(err){
        console.log(err);
        console.log('Database connection failed');
        process.exit(1);
    }
}

module.exports = connectDB;