"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface ChartComponentProps {
  data: { name: string; value: number }[];
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <div className="bg-white p-6 shadow rounded w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik Keuangan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
