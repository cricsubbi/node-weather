const request = require('request')


const forecast = (lati,long,callback)=>{
    const url1 = 'https://api.darksky.net/forecast/be8f274c919a93bee7ef1aad58ec7bfe/'+lati+','+long+'?units=si&&lang=en'

request({ url:url1 ,json: true },(err,res)=>{
        if(err){
    callback(err,undefined) 
    }else{
   callback(undefined,{ 
       sum : res.body.daily.data[0].summary ,
       temp : res.body.currently.temperature, 
       preci : res.body.currently.precipProbability
   })
    }
})
}
module.exports = forecast