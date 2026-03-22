import { Brush, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const LineChartComponent = ({ data, dataKey, color, title, xkey = "time" }) => {
  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:scale-[1.01] transition-all duration-300">
      <h3 className="mb-6 font-semibold text-white text-lg">{title}</h3>
      <div className="w-full overflow-x-auto rounded-2xl">
        <div className="min-w-[900px] h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey={xkey} tickFormatter={(v) => xkey === "date" ? v.slice(5) : v} stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px" }} />
              <Line type="natural" dataKey={dataKey} stroke={color} strokeWidth={3} dot={{ fill: color, r: 4 }} activeDot={{ r: 6 }} />
              <Brush dataKey={xkey} height={30} stroke="#22d3ee" fill="#22d3ee20" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;