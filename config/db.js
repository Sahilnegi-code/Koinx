const mongoose = require('mongoose');

const connectDB = async ( )=>{
    try{
const conn = await mongoose.connect('mongodb+srv://sahilnegipang:8bQRwHzvK3d1t2SA@cluster0.7sguw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useUnifiedTopology:true,
    useNewUrlParser: true
}) 
 }
    catch(err){

  process.exit();

    }
}
module.exports = connectDB;