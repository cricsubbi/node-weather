const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const pubdir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath =  path.join(__dirname,'../templates/partials')


app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weathertron' 
    })

})
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(pubdir))

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        title: 'subodh' 
    })

})

app.get('/help', (req,res)=>{
    res.render('help.hbs',{
        title: 'help' 
    })

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide a valid address'
        })
    }
    geocode(req.query.address,(err,{lati,long,loc})=>{
        if(err){
           return res.send({err})
        }
    
    else{
        forecast(lati,long,(err,forecastdata)=>{
            if(err){
                return res.send({err})
             }
             else{
                 res.send({
                 forecast:forecastdata,loc,
                 address: req.query.address
                })
             } 
        })
    }

    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
    res.send({
        error: 'you must provide a valid search term'
    })
} 
    else{
    console.log(req.query.search)
    res.send({
        products: [] 
    })
}


})
app.get('*',(req,res)=>{
    res.render('404.hbs',{
       
    })
})
app.listen(3000,()=>{
    console.log('server is up and running on port 3000')
})