const request = require('request')
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+ ".json?access_token=pk.eyJ1Ijoic3Vib2RoMTgiLCJhIjoiY2szNGptZjgzMDJ0MzNjbXYzMnpjbXZzciJ9.orvc9OFTHcRJuU7ec_ltig" 
    request({ url:url ,json: true },(err,res)=>{
            if(err){
                callback('unable to connect to the internet -.- ',undefined)
            }else{
                callback(undefined,{
            lati: res.body.features[0].center[1],
            long: res.body.features[0].center[0],
            loc : res.body.features[0].place_name
           
            
            })
            
        }
    })
}
module.exports = geocode
 