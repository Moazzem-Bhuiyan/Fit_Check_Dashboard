"use client";

import { DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-full bg-black px-3 py-2 text-sm font-medium text-white">
        {payload[0].value} users
      </div>
    );
  }
  return null;
};

export default function UserStatistics({ data: userData, onYearChange }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const data = userData?.map((item, inx) => ({
    key: inx + 1,
    month: item?.month,
    users: item?.count,
  }));
  const handleChange = (date, dateString) => {
    // Date string will contain the selected year
    setSelectedYear(dateString); // DatePicker returns the year in 'YYYY' format
    onYearChange(dateString);
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-md xl:w-full">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">User Overview</h2>
        <div className="space-x-3">
          <DatePicker
            value={selectedYear ? moment(selectedYear, "YYYY") : null}
            onChange={handleChange}
            picker="year"
            placeholder="Select Year"
            style={{ width: 120 }}
          />
        </div>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" height={310}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              stroke="#145880"
              horizontal={false}
              vertical={true}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#145880" }}
              dy={10}
            />
            <YAxis
              domain={[0, 12]}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#145880" }}
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip payload={data} />}
              cursor={{ stroke: "transparent" }}
              position={{ y: -10 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#145880"
              strokeWidth={2}
              dot={{ fill: "#000", strokeWidth: 0, r: 8 }}
              activeDot={{ r: 6, fill: "#ffff", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
