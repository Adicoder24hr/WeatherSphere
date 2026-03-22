import { useEffect, useState } from "react";
import { fetchWeatherData, fetchAirQuality } from "../services/weatherApi";

const useWeather = () => {

    const[weather, setWeather] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            async (position) =>{
                try{
                    const { latitude, longitude } = position.coords;

                    const weatherData = await fetchWeatherData(latitude, longitude);
                    const airData = await fetchAirQuality(latitude, longitude);
                    setWeather({
                        ...weatherData,
                        air: airData,
                    });
                }catch(err){
                    setError("failed to fetch weather");
                }
                finally{
                    setLoading(false);
                }
            },
            ()=>{
                setError("Location access denied");
                setLoading(false);
            }
        );
    }, [])

  return { weather, loading, error };
}

export default useWeather