"use client";

import { DatePicker, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import moment from "moment";

const EarningSummary = ({ data: earnigData, onYearChange }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  const data = earnigData?.map((item, inx) => ({
    key: inx + 1,
    month: item?.month,
    amount: item?.amount,
  }));

  const handleChange = (date, dateString) => {
    // Date string will contain the selected year
    setSelectedYear(dateString); // DatePicker returns the year in 'YYYY' format
    onYearChange(dateString);
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-md xl:w-full">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-2xl font-semibold text-gray-900">
          Earning Overview
        </h1>

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

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          {/* Define Gradient */}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={1} />
              <stop offset="100%" stopColor="#145880" stopOpacity={1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            formatter={(value) => [`Monthly Earnings: ${value}`]}
            contentStyle={{
              color: "var(--primary-green)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="5 5"
          />

          <Bar
            barSize={40}
            radius={4}
            background={false}
            dataKey="amount"
            fill="url(#colorGradient)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningSummary;
