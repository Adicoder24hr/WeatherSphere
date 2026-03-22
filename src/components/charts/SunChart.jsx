import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

const SunChart = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:scale-[1.01] transition-all duration-300">
      <h3 className="mb-6 font-semibold text-white text-lg flex items-center gap-2">
        🌅 Sun Cycle
      </h3>

      <div className="w-full overflow-x-auto rounded-2xl bg-slate-950/40">
        <div className="min-w-[900px] h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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

              <Bar 
                dataKey="sunrise" 
                fill="#f59e0b" 
                name="Sunrise (hour)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="sunset" 
                fill="#6366f1" 
                name="Sunset (hour)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">Sunrise & Sunset hours across selected dates</p>
    </div>
  );
};

export default SunChart;