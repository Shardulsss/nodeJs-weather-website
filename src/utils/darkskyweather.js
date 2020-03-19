const request =require('request')


const weather = (lt,lg,callback)=>{
    const url = 'https://api.darksky.net/forecast/c76a3bb8a4aefd9ef8492aab5c5f90b4/'+lt+','+lg+'?units=si'
    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('no network',undefined);
        }
        else if(response.body.error){
            callback('incorrect dimensions',undefined);
        }
        else{
            // const temp = response.body.currently.temperature
            // callback(undefined,temp)
            const temp = response.body.currently.temperature;
            const humidity = response.body.currently.humidity;
            const pressure = response.body.currently.pressure;
            const windSpeed = response.body.currently.windSpeed;
            callback(undefined,{
                temp,
                pressure,
                humidity,
                windSpeed,
            })
        }
    })

}

module.exports = weather