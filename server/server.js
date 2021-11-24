require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')
const { PORT, CITY_API_URL, WEATHER_API_URL } = require('./constants');
const app = express();
const { getWeatherDataFromCity, setWeatherData } = require('./database/interfaces');
const { isValidDate } = require('./helpers');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const router = express.Router();

app.use('/api/v1', router);

Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
};

router.get('/get-weather', async function (req, res) {
    let { cityName, date } = req.query;

    if (!cityName || !date) {
        return res.status(400).json({error: 'City or Date Missing'});
    }

    try {
        cityName = decodeURIComponent(cityName);
        date = decodeURIComponent(date);
        
        cityName = cityName.replace(',', '.');
        const dateObject = new Date(date);
        if (!isValidDate(dateObject)) {
            return res.status(400).json({error: 'Invalid Date'});
        }

        const result = await getWeatherDataFromCity({cityName, date: dateObject.toDateString()});

        if (result) {
            const { data } = result;
            return res.status(200).json({ data });
        }
        else {            
            const { data } = await axios.get(`${WEATHER_API_URL}${cityName}`);

            if (data && data.count == 1) {
                await setWeatherData({
                    cityName,
                    date: dateObject.toDateString(),
                    data: data.data[0],
                })
                return res.status(200).json({data: data.data[0]});
            }
            else {
                return res.status(400).json({error: 'City Not Found'});
            }
        }
        
    }
    catch (error) {
        console.log("🚀 ~ file: server.js ~ line 42 ~ error", error)
        return res.status(500).json(error);
    }

    
})


router.get('/get-cities/:city', async (req, res) => {
    try {
        const { city } = req.params

        if (!city) {
            return res.status(400).json({error: 'city is empty'});
        }

        const { data } = await axios.get(`${CITY_API_URL}${city}`);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log("🚀 ~ file: server.js ~ line 43 ~ app.get ~ error", error)
        return res.status(500).json(error);
    }
}
);

app.listen(PORT, () => console.log(`HTTP Server running on port ${PORT}`));
