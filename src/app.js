// 'Path' helps to work with/switch between
// folders , relative , absolute file path efficiently.
const path = require('path')
// 'Express' sets up web server and listen to client requests.
const express = require('express')
// import handlebars
const hbs = require('hbs')
// Gives handle over the web application running in server.
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Set up express to use a fixed folder for all the static contents.
app.use(express.static(path.join(__dirname ,'../webcontent')))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
// Set up express to use 'handlebars' as 'view engine' to process dynamic web content.
// This is like "JSP" in JEE
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Arindam Maji'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Arindam Maji'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Support Page',
        name: 'Arindam Maji',
        message: 'Contatct Us'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        })
    }
    geocode.geoLocation(req.query.address, (error, locationData)=>{
        if(error){
            res.send({
                error: error
            })
        }else {
            forecast.weather(locationData, (error, {temperature, feelslike, precip}={})=>{
                if(error){
                    res.send({
                        error: error
                    })
                }else{
                    res.send({
                        forecast: "It is "+temperature + " degrees out. But feels like " + feelslike + " degrees.There is "+precip+" % chance of rain today." ,
                        location: locationData.place
                    })
                    }
            })
        }
    })
})
app.get('/help/*', (req, res)=>{
    res.render('page404',{
        message: 'help article not found',
        name: 'Arindam Maji'
    })
})

app.get('*', (req, res)=>{
    res.render('page404',{
        message: 'page not found',
        name: 'Arindam Maji'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up and running..')
})

