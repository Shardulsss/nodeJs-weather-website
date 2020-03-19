const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const geocode = require('./utils/geoc')
const weatherPredictor = require('./utils/darkskyweather')
const app = express()
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000
const urlBodyParser = bodyParser.urlencoded({extended:false});


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get("",(req,res)=>{
    res.render('index',{
        title:"Hall of Justice",
        name: "Titan X",
        
    })
})

app.get("/contact",(req,res)=>{
    res.render('contact',{
        title:"Contact our Heroes",
        details:"these are some details",
        name: "Titan X",
        
    })
})

app.get("/weather",(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.render('noWeather',{
            title:"Live weather forecast",
            name: "Titan X",
        })
        
        
    }
    console.log(address)
    geocode(address,(error,{latitude,longitude}={})=>{
        if(error){
            return res.send("location not found")

        }
        weatherPredictor(latitude,longitude,(error,{temp,pressure,humidity,windSpeed}=wresponse)=>{
            //res.send('temperature is : ' +wresponse)
            res.render('weather',{
                title:"Live weather forecast",
                //details:wresponse,
                temp:temp,
                pressure:pressure,
                humidity:humidity,
                windSpeed:windSpeed,
                name: "Titan X",
                location: address,

            })

        })
    })

    // res.render('weather',{
    //     title:"Udemy weather forecast",
    //     details:"these are some details",
    //     name: "Shardul",
        
    // })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'page not found',
    })
})
//const publicpath = path.join(__dirname,'../public')

//app.use(express.static(publicpath));
app.post('/myaction', urlBodyParser, function(req, res) {
    console.log(req.body.location)
    const address = req.body.location;
    if(!address){
        return res.render('noWeather',{
            title:"Live weather forecast",
            name: "Titan X",
        })
        
        
    }
    console.log(address)
    geocode(address,(error,{latitude,longitude}={})=>{
        if(error){
            return res.send('location not found')
        }
        weatherPredictor(latitude,longitude,(error,{temp,pressure,humidity,windSpeed}=wresponse)=>{
            //res.send('temperature is : ' +wresponse)
            res.render('weather',{
                title:"Live weather forecast",
                //details:wresponse,
                temp:temp,
                pressure:pressure,
                humidity:humidity,
                windSpeed:windSpeed,
                name: "Titan X",
                location: address,

            })

        })
    })
    
    
    
    // geocode(address, (error,{latitude,longitude})=>{
    //     weatherPredictor(latitude,longitude,(error,{temp,pressure,humidity,windSpeed})=>{
    //         res.send('details:'+temp)
    //     })
    // })
    
    //res.send("you requested for "+req.body.in)
  });



app.listen(port, ()=>{
    console.log("server is on")
})


