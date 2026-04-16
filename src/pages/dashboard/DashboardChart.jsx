import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded p-2 shadow-sm">
        <p className="fw-semi-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="mb-0" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardChart = ({ data, title, hasData }) => {
  if (!hasData || !data || data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer height={400} width="100%">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5d80f9" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#5d80f9" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#36c9a4" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#36c9a4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
        <XAxis
          dataKey="name"
          stroke="#868e96"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e9ecef' }}
        />
        <YAxis
          stroke="#868e96"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e9ecef' }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: '1rem' }}
          iconType="line"
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#5d80f9"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUsers)"
          name="Users"
          activeDot={{ r: 6 }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#36c9a4"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorRevenue)"
          name="Revenue ($)"
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
