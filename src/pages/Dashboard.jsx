import { useState, useEffect } from "react";
import { fetchWeatherData, fetchAirQuality } from "../services/weatherApi";
import formatWeatherData from "../utils/formatWeatherData";
import WeatherCard from "../components/ui/WeatherCard";
import LineChartComponent from "../components/charts/LineChartComponent";
import MultiLinechart from "../components/charts/MultiLinechart";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  const convertTemp = (temp) => unit === "C" ? temp : (temp * 9 / 5) + 32;

  const displayDate = new Date(selectedDate).toLocaleDateString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric"
  }).replace(/\//g, "-");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchSingleDay = async () => {
      setLoading(true);
      setError(null);

      if(selectedDate > today) {
        setError("Future dates are not supported yet. Please select today or a past date.");
        setLoading(false);
        return;
      }

      try {
        const isToday = selectedDate === new Date().toISOString().split("T")[0];

        let data;
        if (isToday) {
          const weatherRes = await fetchWeatherData(21.125, 79);
          const airRes = await fetchAirQuality(21.125, 79);
          data = { ...weatherRes, air: airRes };
        } else {
          const weatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=21.125&longitude=79&start_date=${selectedDate}&end_date=${selectedDate}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility,wind_speed_10m&timezone=auto`;
          const airUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=21.125&longitude=79&start_date=${selectedDate}&end_date=${selectedDate}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide&timezone=auto`;

          const [weatherRes, airRes] = await Promise.all([
            fetch(weatherUrl).then(r => r.json()),
            fetch(airUrl).then(r => r.json())
          ]);

          data = {
            current: {
              temperature_2m: weatherRes.hourly.temperature_2m[0] ?? 0,
              relative_humidity_2m: weatherRes.hourly.relative_humidity_2m[0] ?? 0,
              precipitation: weatherRes.hourly.precipitation[0] ?? 0,
              wind_speed_10m: weatherRes.hourly.wind_speed_10m[0] ?? 0,
            },
            daily: weatherRes.daily,
            hourly: weatherRes.hourly,
            air: airRes,
          };
        }

        setWeatherData(data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleDay();
  }, [selectedDate]);

  const formatted = weatherData ? formatWeatherData(weatherData) : null;

  if (loading){
    return (
      <Loading 
      displayDate={displayDate}
      heading="Fetching weather for"
      subHeading="Hang tight... this won't take long"
      />
    )
  }

  if(error){
    return (
      <Error 
      error={error} />
    )
  }

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm opacity-80">{displayDate}</p>
          <div className="text-5xl md:text-7xl font-bold mt-2">
            {formatted ? convertTemp(formatted.temperature.current).toFixed(1) : "--"}°{unit}
          </div>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="bg-white/20 backdrop-blur px-6 py-3 rounded-2xl text-white border border-white/30 focus:outline-none w-full md:w-auto"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherCard title="🌡️ Temperature">
          <button onClick={() => setUnit(unit === "C" ? "F" : "C")} className="mb-4 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl text-sm font-medium transition">
            Switch to °{unit === "C" ? "F" : "C"}
          </button>
          <p className="text-6xl font-bold">{formatted ? convertTemp(formatted.temperature.current).toFixed(1) : "--"}°{unit}</p>
          <p className="mt-4 text-lg">Min: {formatted?.temperature.min}°C • Max: {formatted?.temperature.max}°C</p>
        </WeatherCard>

        <WeatherCard title="🌦️ Atmosphere">
          <p className="text-3xl font-medium">Humidity: {formatted?.atmosphere.humidity || "--"}%</p>
          <p className="mt-3">Precipitation: {formatted?.atmosphere.precipitation ?? "--"} mm</p>
          <p>UV Index: {formatted?.atmosphere.uv || "--"}</p>
        </WeatherCard>

        <WeatherCard title="🌅 Sun Cycle">
          <p>Sunrise: {formatted?.sun.sunrise || "--"}</p>
          <p>Sunset: {formatted?.sun.sunset || "--"}</p>
        </WeatherCard>

        <WeatherCard title="💨 Wind">
          <p>Speed: {formatted?.wind.speed || "--"} km/h</p>
          <p>Precip Prob: {formatted?.wind.precipitationProb || "--"}%</p>
        </WeatherCard>

        <div className="lg:col-span-3">
          <WeatherCard title="🌫️ Air Quality">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-lg">
              <p>PM10: {formatted?.air.pm10 || "--"}</p>
              <p>PM2.5: {formatted?.air.pm25 || "--"}</p>
              <p>CO: {formatted?.air.co || "--"}</p>
              <p>NO2: {formatted?.air.no2 || "--"}</p>
              <p>SO2: {formatted?.air.so2 || "--"}</p>
              <p>AQI: -- </p>
            </div>
          </WeatherCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
        <LineChartComponent data={formatted?.hourly || []} dataKey="temperature" color="#22d3ee" title="🌡️ Temperature" />
        <LineChartComponent data={formatted?.hourly || []} dataKey="humidity" color="#4ade80" title="💧 Humidity" />
        <LineChartComponent data={formatted?.hourly || []} dataKey="precipitation" color="#60a5fa" title="🌧️ Precipitation" />
        <LineChartComponent data={formatted?.hourly || []} dataKey="visibility" color="#fbbf24" title="👁️ Visibility" />
        <LineChartComponent data={formatted?.hourly || []} dataKey="wind" color="#c084fc" title="💨 Wind Speed" />
        <MultiLinechart data={formatted?.hourly || []} title="🌫️ PM10 vs PM2.5" xkey="time" />
      </div>
    </div>
  );
};

export default Dashboard;