const express = require("express");
const cron = require('node-cron');
const connectDB = require("./config/db");
const {fetchCryptoData, getStats,getDeviation} = require('./controller/cryptoController') 
const app = express();
const TWO_HOURS = 2 * 60 * 60 * 1000; 
setInterval(fetchCryptoData, TWO_HOURS);
connectDB();

app.get('/stats', async (req , res)=>{
    const {coin} = req.query;
    try{
    const data = await getStats(coin );
     res.status(200).json({
        "price":data.price,
        "marketCap": data.marketCap,
        "24hChange": data['24hChange'],
     });
    }
    catch(err){
        res.status(400).json({err});
    }
     
})

app.get('/deviation' , async(req ,res)=>{
    let {coin} = req.query;
    try{
        const data = await getDeviation(coin );
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({err});
    }
})


  

app.listen(8000, () => console.log('Server started on port 8000'));
