const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeatherData = async (lat,lon) =>{
     const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility,wind_speed_10m&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export const fetchAirQuality = async (lat, lon) =>{
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

export const fetchHistoricalData = async (lat, lon, start, end) =>{
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    return data;
}

export const fetchHistoricalAir = async (lat, lon, start, end) =>{
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=pm10,pm2_5&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}