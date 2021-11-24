import { useRouter } from "next/router"
import { useState } from "react";
import { WeatherBitIconUrl } from "../constants";
import { getUrlFromCityAndDate, isValidDate } from "../helpers";




export default function WeatherCard({ data }) {
    const router = useRouter();
    const { cityName, date } = router.query;
    const [isCelsius, setIsCelsius] = useState(true);
    const {
        temp,
        sunrise,
        sunset,
        timezone,
        rh,
        clouds,
        weather: { description, icon }
    } = data;
    const fahre = (temp * 9 / 5) + 32;


    if (!isValidDate(new Date(date))) {
        router.push('/404')
    }

    return (
        <div className='weather-card col-8'>
            <div style={{ textAlign: 'right' }}>
                <button
                    onClick={() => router.push('/')}
                    className='btn btn-primary'>
                    Home
                </button>
            </div>
            <div className="item row mt-3">
                <div className="key col-md-4 text-warning">Location: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {cityName}
                    </b>
                    <img
                        src={WeatherBitIconUrl + `${icon}.png`}
                        className="img-fluid"
                        style={{ width: '30px', height: '30px' }}
                        alt='Weather Image'
                    />
                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">Date: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {date}
                    </b>

                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">Weather description: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {description}
                    </b>
                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">Sunrise: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {sunrise} Local Time ({timezone} Timezone)
                    </b>
                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">Sunset: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {sunset} Local Time ({timezone} Timezone)
                    </b>
                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">Clouds: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {clouds} %
                    </b>
                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">Relative Humidity: </div>
                <div className="value col-md-7 text-info">
                    <b>
                        {rh} %
                    </b>
                </div>
            </div>
            <div className="item row">
                <div className="key col-md-4 text-warning">
                    Temperature:
                </div>
                <div className="value col-md-7 text-info">
                    <span style={{ marginRight: '2rem' }}>
                        <b className=''>
                            {isCelsius ? `${temp} C` : `${fahre} F`}
                        </b>
                    </span>
                    <button
                        className='btn-info'
                        onClick={() => setIsCelsius(!isCelsius)}>
                        {`Show ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
                    </button>
                </div>
            </div>
            {/* Future Scope of adding previous and Next button to check weather */}
            {/* <div className="mt-5" style={{ textAlign: 'center' }}>
                <button
                    className='btn btn-info'
                    onClick={() => {
                        const dateObject = new Date(date);
                        dateObject.setDate(dateObject.getDate() - 1)
                        router.push(getUrlFromCityAndDate({ cityName, date: dateObject.toDateString() }))
                    }}
                >
                    {`Previous Day`}
                </button>
                <button
                    style={{ marginLeft: '2rem' }}
                    className='btn btn-info ml-3'
                    onClick={() => {
                        const dateObject = new Date(date);
                        dateObject.setDate(dateObject.getDate() + 1)
                        router.push(getUrlFromCityAndDate({ cityName, date: dateObject.toDateString() }))
                    }}
                >
                    {`Next Day`}
                </button>
            </div> */}
        </div>
    )
}
