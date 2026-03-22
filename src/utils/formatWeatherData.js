const formatWeatherData = (data) =>{
    return {
        temperature: {
            current: data.current.temperature_2m,
            min: data.daily.temperature_2m_min[0],
            max: data.daily.temperature_2m_max[0],
        },

        atmosphere: {
            humidity: data.current.relative_humidity_2m,
            precipitation: data.current.precipitation,
            uv: data.daily.uv_index_max?.[0] || "--",
        },

        sun: {
            sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString(),
            sunset: new Date(data.daily.sunset[0]).toLocaleTimeString(),
        },

        wind: {
            speed: data.current.wind_speed_10m,
            precipitationProb: data.daily.precipitation_probability_max?.[0] || "--",
        },

        air: {
            pm10: data.air?.hourly?.pm10?.[0] || "--",
            pm25: data.air?.hourly?.pm2_5?.[0] || "--",
            co: data.air?.hourly?.carbon_monoxide?.[0] || "--",
            no2: data.air?.hourly?.nitrogen_dioxide?.[0] || "--",
            so2: data.air?.hourly?.sulphur_dioxide?.[0] || "--",
            aqi: "--",
        },
        hourly: data.hourly.time.map((time, index) => ({
            time: new Date(time).getHours(),
            temperature: data.hourly.temperature_2m[index],
            humidity: data.hourly.relative_humidity_2m[index],
            precipitation: data.hourly.precipitation[index],
            visibility: data.hourly.visibility[index],
            wind: data.hourly.wind_speed_10m[index],
            pm10: data.air?.hourly?.pm10?.[index],
            pm25: data.air?.hourly?.pm2_5?.[index],
        })),
    };
};

export default formatWeatherData;