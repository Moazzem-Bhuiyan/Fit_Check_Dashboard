"use client";

import { ConfigProvider } from "antd";
import { Table } from "antd";
import userImage from "@/assets/images/user-avatar.png";
import { useState } from "react";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import moment from "moment";

const RecentTransactions = ({ data: trans, isLoading }) => {
  // Table Data
  const data = trans?.map((item, inx) => ({
    key: inx + 1,
    tranId: item?.tranId || "N/A",
    name: item?.user?.name || "Unknown User",
    amount: item?.amount ? `$${item.amount}` : "$0.00",
    date: moment(item?.createdAt).format("ll"),
  }));
  // =============== Table columns ===============
  const columns = [
    {
      title: "TRANSACTION ID",
      dataIndex: "tranId",
      render: (value) => `#${value}`,
    },
    {
      title: "USER NAME",
      dataIndex: "name",
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: " AMOUNT",
      dataIndex: "amount",
    },
    {
      title: "TRANSACTION DATE",
      dataIndex: "date",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className="">
        <h1 className="text-xl font-semibold">Recent Transactions</h1>
        <p className="mb-5 text-sm text-gray-500">
          Here is a list of recent transactions made by users.
        </p>
        <Table
          style={{ overflowX: "auto", width: "100%" }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%" }}
          pagination={false}
          loading={isLoading}
        ></Table>
      </div>
    </ConfigProvider>
  );
};

export default RecentTransactions;
