export function getUrlFromCityAndDate ({ cityName, date }) {
    return (`/location?cityName=${encodeURIComponent(cityName)}&date=${encodeURIComponent(date)}`)
}

export function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}