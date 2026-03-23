import { useEffect, useState } from "react";
import { fetchHistoricalData, fetchHistoricalAir } from "../services/weatherApi";
import formatHistoricalData from "../utils/formatHistoricalData";
import useWeather from "../hooks/useWeather";                    
import HistoricalTempChart from "../components/charts/HistoricalTempChart";
import LineChartComponent from "../components/charts/LineChartComponent";
import SunChart from "../components/charts/SunChart";
import MultiLinechart from "../components/charts/MultiLinechart";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const Historical = () => {
  const { lat, lon, error: locationError } = useWeather();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("Detecting Location...");

  const useLat = lat || 21.125;
  const useLon = lon || 79;
  const isRealLocation = lat && lon;
  useEffect(() => {
    if (isRealLocation) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=en`)
        .then(res => res.json())
        .then(data => {
          const city = data.address?.city || data.address?.town || data.address?.state_district || "Your City";
          const country = data.address?.country_code?.toUpperCase() || "";
          setLocationName(`${city}, ${country}`);
        })
        .catch(() => setLocationName("Your current location"));
    } else {
      setLocationName("Nagpur (GPS access denied)");
    }
  }, [lat, lon, isRealLocation]);

  useEffect(() => {
    const fetchDefault = async () => {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const past = new Date();
      past.setDate(past.getDate() - 7);
      const sevenDaysAgo = past.toISOString().split("T")[0];

      const res = await fetchHistoricalData(useLat, useLon, sevenDaysAgo, today);
      const air = await fetchHistoricalAir(useLat, useLon, sevenDaysAgo, today);

      setData({ weather: res, air });
      setStartDate(sevenDaysAgo);
      setEndDate(today);
      setLoading(false);
    };
    fetchDefault();
  }, [useLat, useLon]);

  const fetchData = async () => {
    if (!startDate || !endDate) return;
    if (startDate > endDate) {
      setError("Start date must be before end date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (startDate > today || endDate > today) {
      setError("Future dates are not supported. Please select only the past dates.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await fetchHistoricalData(useLat, useLon, startDate, endDate);
    const air = await fetchHistoricalAir(useLat, useLon, startDate, endDate);
    setData({ weather: res, air });
    setLoading(false);
  };

  const formatted = data ? formatHistoricalData(data.weather, data.air) : [];

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">📈 Historical Trends</h1>
          <p className="text-slate-400">Analyze weather patterns over any date range</p>
        </div>
        <div className={`text-xs px-4 py-2 rounded-2xl flex items-center gap-2 ${isRealLocation ? 'bg-teal-400/10 text-teal-300' : 'bg-orange-400/10 text-orange-300'}`}>
          📍 {locationName}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-end bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
        <div className="w-full md:w-fit flex flex-col gap-2">
          <p className="text-lg md:text-xs text-slate-400 mb-1">START DATE</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-white/10 w-full text-lg md:text-sm md:w-fit border border-white/30 text-white px-5 py-3 rounded-2xl focus:outline-none focus:border-teal-400 transition"
          />
        </div>

        <div className="w-full md:w-fit flex flex-col gap-2">
          <p className="text-lg md:text-xs text-slate-400 mb-1">END DATE</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-white/10 border text-lg md:text-sm w-full md:w-fit border-white/30 text-white px-5 py-3 rounded-2xl focus:outline-none focus:border-teal-400 transition"
          />
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="px-8 w-full mt-4 md:mt-0 md:w-fit py-3 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-slate-950 font-semibold rounded-2xl transition-all disabled:opacity-50 shadow-lg"
        >
          {loading ? "Fetching..." : "🔄 Fetch Historical Data"}
        </button>
      </div>

      {loading ? (
        <Loading 
          heading="Analyzing historical trends..."
          subHeading="Crunching weather patterns for you"
        />
      ) : error || locationError ? (
        <Error message={error || locationError} />
      ) : formatted.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HistoricalTempChart data={formatted} />
          <SunChart data={formatted} />

          <LineChartComponent data={formatted} dataKey="precipitation" color="#60a5fa" title="🌧️ Precipitation" xkey="date" />
          <LineChartComponent data={formatted} dataKey="wind" color="#c084fc" title="💨 Wind Speed" xkey="date" />
          <LineChartComponent data={formatted} dataKey="windDir" color="#fb923c" title="🧭 Wind Direction" xkey="date" />
          <MultiLinechart data={formatted} title="🌫️ PM10 vs PM2.5 Over Time" xkey="date" />
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">No data available for the selected range.</div>
      )}
    </div>
  );
};

export default Historical;