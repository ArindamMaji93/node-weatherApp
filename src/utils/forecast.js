const request = require('request')
const weatherStackAPI = 'http://api.weatherstack.com/'
const weatherstack_access_key = '2829b51e32c6420bc924a481c91d39d1'


const getCurrentWeather = ({latitude , longitude}, callBack) =>{
    const url =weatherStackAPI+'current?access_key='+weatherstack_access_key+'&query='+latitude+','+longitude
    request({
        url,
        json: true
    }, (error , {body})=>{
        if(error){
            callBack('Unable to reach Weather Service!', undefined)
        }else if(body.error){
            callBack('Unable to find Location!', undefined)
        }else{
            callBack(undefined, body.current)
            }
    })
}

module.exports = {
    weather: getCurrentWeather
}