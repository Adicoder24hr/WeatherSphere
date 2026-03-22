
const formatHistoricalData = (data, air) =>{
     if (!data || !data.daily || !data.daily.time) return [];
    const days = data.daily.time;

    return days.map((date, index)=>{
        
        const start = index * 24;

        const end = start + 24;

        const pm10Day = air?.hourly?.pm10?.slice(start, end) || [];
        const pm25Day = air?.hourly?.pm2_5?.slice(start, end) || [];

        const avg = (arr) => 
            arr.length ? arr.reduce((a,b)=> a + b, 0) / arr.length : null;
        
       return {
        date,
        tempMax: data.daily.temperature_2m_max[index],
        tempMin: data.daily.temperature_2m_min[index],
        tempMean: 
            (data.daily.temperature_2m_max[index] + 
            data.daily.temperature_2m_min[index]) / 2,
        precipitation: data.daily.precipitation_sum[index],
        wind: data.daily.windspeed_10m_max[index],
        windDir: data.daily.winddirection_10m_dominant[index],

        sunrise: new Date(data.daily.sunrise[index]).getHours(),
        sunset: new Date(data.daily.sunset[index]).getHours(),

        pm10: avg(pm10Day),
        pm25: avg(pm25Day),
    }});
};

export default formatHistoricalData;