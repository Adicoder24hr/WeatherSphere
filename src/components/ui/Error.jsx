const Error = ({ message }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-10 max-w-md text-center">
        <div className="text-6xl mb-6">☁️😕</div>
        <h3 className="text-2xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
        <p className="text-slate-400 mb-8">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-2xl hover:bg-teal-400 hover:text-white transition-all"
        >
          Retry Now
        </button>
      </div>
    </div>
  );
};

export default Error;