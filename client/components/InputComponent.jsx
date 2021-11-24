import { getCities } from '../services';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { getUrlFromCityAndDate } from '../helpers';

let timeObject;
export default function InputComponent() {
    const router = useRouter()
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])


    const getCityData = async () => {
        try {
            const { data } = await getCities(city);
            setCities(data);
        }
        catch (error) {
            console.log("🚀 ~ file: InputComponent.jsx ~ line 14 ~ getCityData ~ error", error)
        }
    }


    useEffect(() => {
        if (city) {
            if (timeObject) {
                clearInterval(timeObject)
            }
            timeObject = setTimeout(() => {
                getCityData()
            }, 500)
        }
    }, [city])


    return (
        <div>
            <label>
                Enter City Name:
            </label>
            <input
                type='text'
                name='city'
                className='input'
                value={city}
                onChange={(e) => {
                    e.preventDefault()
                    setCity(e.target.value)
                }}
            >

            </input>
            <div className='cities-wrapper'>
                {cities.map((city, index) => {
                    return (
                        <p
                            className="city"
                            key={city}
                            onClick={() => {
                                router.push(getUrlFromCityAndDate({ cityName: city, date: new Date().toDateString() }))
                            }}
                        >
                            {city}
                        </p>
                    )
                })}
            </div>

        </div>
    )
}
