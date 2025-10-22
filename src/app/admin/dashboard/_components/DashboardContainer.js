"use client";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";
import EarningSummary from "./Earnings";
import UserStatistics from "./UserChart";
import icon1 from "@/assets/images/staticsicon1.png";
import icon2 from "@/assets/images/staticsicon2.png";
import Image from "next/image";
import { useState } from "react";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import RecentTransactions from "./RecentTransactions";

export default function DashboardContainer() {
  const [earningcurrentYear, setearnigCurrentYear] = useState(null);
  const [usercurrentYear, setuserCurrentYear] = useState(null);
  const { data, isLoading } = useGetDashboardDataQuery({
    earningcurrentYear,
    usercurrentYear,
  });

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-124px)]">
        <div className="h-[calc(100vh-124px)] p-6">
          <div className="max-w-9xl mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg bg-white shadow-md"
                >
                  <div className="p-0">
                    <div className="h-48 rounded-t-lg bg-gray-200"></div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 h-4 rounded bg-gray-200"></div>
                    <div className="mb-4 h-3 rounded bg-gray-200"></div>
                    <div className="flex gap-2">
                      <div className="h-9 flex-1 rounded bg-gray-200"></div>
                      <div className="h-9 flex-1 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // stats Data
  const userStats = [
    {
      key: "users",
      title: "Total Users",
      count: data?.data?.totalUserCount || 0,
      icon: icon2,
    },
    {
      key: "earning",
      title: "Total Earning",

      icon: icon1,
      count: data?.data?.totalRevenue || 0,
    },
  ];
  const handleEarningYearChange = (year) => {
    setearnigCurrentYear(year);
  };
  const handleUserYearChange = (year) => {
    setuserCurrentYear(year);
  };

  return (
    <div className="space-y-20">
      {/*================== User Stats Sectio=n======================== */}
      <section className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="gap-x-4 rounded-2xl bg-[#FFFFFF] p-5 text-black shadow-sm"
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-dmSans text-lg font-medium">{stat.title}</p>
                <h5 className="mt-0.5 text-3xl font-semibold text-black">
                  {stat.key !== "earning" ? (
                    <CustomCountUp end={stat.count} />
                  ) : (
                    <span>
                      $<CustomCountUp end={stat.count} />
                    </span>
                  )}
                </h5>
              </div>
              <div
                className={`flex aspect-square !w-20 items-center justify-center rounded-full ${
                  stat.key === "earning"
                    ? "bg-[#F2F2F2]"
                    : "bg-gradient-to-tr from-[#22C55E] to-[#1B70A6]"
                }`}
              >
                <Image src={stat.icon} alt={stat.title} className="h-10 w-10" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/*====================== Charts=================== */}
      <section className="flex-center-between flex-col gap-10 xl:flex-row">
        <EarningSummary
          data={data?.data?.earningOverview}
          onYearChange={handleEarningYearChange}
        />
        <UserStatistics
          data={data?.data?.userOverview}
          onYearChange={handleUserYearChange}
        />
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentTransactions
          data={data?.data?.recentTransactions}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}
