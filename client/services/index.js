const { nodeAxios, } = require('./axios');

export const getCities = async (city) => {
    return await nodeAxios.get(`/get-cities/${city}`)
}

export const getWeatherFromCity = async (city, date) => {
    return await nodeAxios.get(`/get-weather?cityName=${city}&date=${date}`)
}

