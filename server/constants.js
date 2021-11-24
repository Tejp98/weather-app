const PORT = process.env.PORT || 8000
const CITY_API_URL = 'http://gd.geobytes.com/AutoCompleteCity?q=';
const WEATHER_API_URL = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&city=`;

module.exports = {
    PORT,
    CITY_API_URL,
    WEATHER_API_URL
}