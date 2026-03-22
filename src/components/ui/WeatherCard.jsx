const WeatherCard = ({ title, children }) => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:scale-[1.02] hover:shadow-3xl transition-all duration-300">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-white">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default WeatherCard;