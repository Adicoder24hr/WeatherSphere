const Loading = ({ displayDate, heading, subHeading }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-teal-400"></div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl animate-pulse">
          🌦️
        </div>
      </div>

      <p className="mt-8 text-2xl font-medium text-white">
        {heading} {displayDate ? `• ${displayDate}` : ""}
      </p>
      <p className="text-slate-400 mt-2 text-center max-w-xs">{subHeading}</p>
    </div>
  );
};

export default Loading;