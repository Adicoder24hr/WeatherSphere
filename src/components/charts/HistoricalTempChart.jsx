import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const HistoricalTempChart = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:scale-[1.01] transition-all duration-300">
      <h3 className="mb-6 font-semibold text-white text-lg flex items-center gap-2">
        🌡️ Temperature Trends
      </h3>

      <div className="w-full overflow-x-auto rounded-2xl bg-slate-950/40">
        <div className="min-w-[900px] h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => value.slice(5)} 
                stroke="#94a3b8" 
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#0f172a", 
                  border: "none", 
                  borderRadius: "12px", 
                  color: "#e2e8f0" 
                }} 
              />
              <Legend wrapperStyle={{ color: "#e2e8f0", paddingTop: "10px" }} />

              <Line 
                type="natural" 
                dataKey="tempMax" 
                stroke="#ef4444" 
                strokeWidth={3} 
                dot={{ fill: "#ef4444", r: 4 }} 
                activeDot={{ r: 7 }} 
                name="Max Temperature"
              />
              <Line 
                type="natural" 
                dataKey="tempMin" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ fill: "#3b82f6", r: 4 }} 
                activeDot={{ r: 7 }} 
                name="Min Temperature"
              />
              <Line 
                type="natural" 
                dataKey="tempMean" 
                stroke="#22c55e" 
                strokeWidth={3} 
                dot={{ fill: "#22c55e", r: 4 }} 
                activeDot={{ r: 7 }} 
                name="Average Temperature"
              />

              <Brush 
                dataKey="date" 
                height={35} 
                stroke="#22d3ee" 
                fill="#22d3ee15" 
                travellerWidth={8}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">Drag the brush to zoom • Scroll horizontally</p>
    </div>
  );
};

export default HistoricalTempChart;