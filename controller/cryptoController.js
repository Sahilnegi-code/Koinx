const Coin = require("../modals/CoinSchema");
const fetchCryptoData = async () => {
    try {
        const api = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2Cethereum%2Cmatic');
        const data = await api.json();
        const coins = [];
        const bitcoinData = data.find((curr) => curr.name === 'Bitcoin');
        bitcoinData && coins.push(  {
            price: bitcoinData.current_price,
            name: 'Bitcoin',
            marketCap: bitcoinData.market_cap,
            "24hChange": bitcoinData.price_change_24h
        });
        const ethereumData = data.find((curr) => curr.name === 'Ethereum');
        ethereumData && coins.push( {
            price: ethereumData.current_price,
            name: 'Ethereum',
            marketCap: ethereumData.market_cap,
            "24hChange": ethereumData.price_change_24h
        })
        const maticData = data.find((curr) => curr.name === 'Polygon');
        maticData && coins.push( {
            price: maticData.current_price,
            name: 'matic-network',
            marketCap: maticData.market_cap,
            "24hChange": maticData.price_change_24h
        })
         const savedData = await Coin.insertMany(coins);
        
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}
const getStats = async (coin) =>{
    try{
    coin = coin[0].toUpperCase() + coin.slice(1);
    const coinData  = await Coin.find({
        name: coin, 
    }).sort({ updatedAt: -1 }).limit(1); //;
     return coinData[0];
    }
    catch(err){
        return new Error(`error : ${err}`);
    }
}
const getDeviation = async (coin) =>{
   
    function calculateMean(data) {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / data.length;
      }
    function calculateStandardDeviation(data) {
        const mean = calculateMean(data);
        const squaredDifferences = data.map(value => (value - mean) ** 2);
        const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / data.length - 1 ;
        return Math.sqrt(variance);
      }

      coin = coin[0].toUpperCase() + coin.slice(1);
      try{
      const coinData  = await Coin.find({
          name: coin, 
      }).sort({ updatedAt: -1 }).limit(100); //;
    console.log(coinData.length)
      if(coinData.length <  100) return new Error('Not Enough 100 Records')
      let deviationResult =  calculateStandardDeviation(coinData.map(curr=>curr.price))
    console.log(deviationResult)
       return {deviation:deviationResult};
}
catch(err){
    throw new Error(`error : ${err}`);
}  

}
module.exports = {fetchCryptoData , getStats , getDeviation};