const request = require('request')
const mapBoxAPI= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapbox_access_token = 'pk.eyJ1IjoiYXJpbmRhbTkzIiwiYSI6ImNrOHVpbDNwczAwMHEzc3F4YWhhdmlnbWUifQ.APyiEpHuz_Q0Ux01A_X88Q'

const geoLocation = (city , callBack)=>{
    const url = mapBoxAPI+city+'.json?access_token='+mapbox_access_token
    request({
        url,
        json: true
    }, 
    (error , {body})=>{
        if(error){
            callBack('Unable to reach GeoCode Service!', undefined)
        }else if(body.features.length==0){
            callBack('Unable to find Location!', undefined)
        }
        else{
            const {center, place_name:place} = body.features[0]
            callBack(undefined,
                    {
                    place,
                    latitude: center[1],
                    longitude: center[0]
                })
            }
    })
}

module.exports = {
    geoLocation,
}