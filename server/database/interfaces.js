const { UUID } = require('bson');
const mongo = require('./mongo');


const dbName = "weather"
const cityCollection = "cities"


async function getWeatherDataFromCity({cityName, date}) {
    const cityRegex = new RegExp(["^", cityName, "$"].join(""), "i");
    const dateRegex = new RegExp(["^", date, "$"].join(""), "i");

    const client = await mongo.getDBClient();
    const result = await client.db(dbName).collection(cityCollection).findOne(
        {
            cityName: cityRegex,
            date: dateRegex
        }
    );

    return result;
}

async function setWeatherData({ cityName, date, data }) {
    const client = await mongo.getDBClient();
    await client.db(dbName).collection(cityCollection).insertOne({cityName, date, data});
}

module.exports = {
    getWeatherDataFromCity,
    setWeatherData
}
