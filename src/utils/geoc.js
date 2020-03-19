const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address +'.json?access_token=pk.eyJ1Ijoic2hhcmR1bHNzcyIsImEiOiJjazd2am9mangxYTk1M2ZwZ2lhNTduMDAxIn0.OK6GOJ9wTBPeA3nUSJcSdA&limit=1'
    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('no network', undefined)
        }
        else if(response.body.features.length===0){
            callback('incorrect address',undefined)
        }
        else{
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
            callback(undefined,{latitude , longitude})
        }
    })
}



module.exports=geocode