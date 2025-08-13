"use client";

import { Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { ChevronLeft, ChevronRight, Search, Trash } from "lucide-react";
import { Eye } from "lucide-react";
import { UserX } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import ProfileModal from "@/components/SharedModals/ProfileModal";
import { Tag } from "antd";
import {
  useBlockUnblockUserMutation,
  useDeleteUserMutation,
  useGetAllusersQuery,
} from "@/redux/api/userApi";
import moment from "moment";
import toast from "react-hot-toast";

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUser, SetSelecteduser] = useState("");

  // User data with query parameterss
  const { data, isLoading } = useGetAllusersQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // status change api handaler----------------

  const [updateStatus, { isLoading: updating }] = useBlockUnblockUserMutation();

  // delete api handaler ===================

  const [deleteUser, { isLoading: Deleteting }] = useDeleteUserMutation();

  // Table Data transformation
  const tabledata =
    data?.data?.map((item, inx) => ({
      key: inx + 1 + (currentPage - 1) * 10,
      name: item?.name,
      userImg: item?.photoUrl,
      email: item?.email,
      contact: item?.contactNumber,
      date: moment(item?.createdAt).format("DD-MM-YYYY"),
      status: item?.status,
      _id: item?._id,
    })) || [];

  // Block user handler
  const handleBlockUser = async (values) => {
    const payload = {
      userId: values._id,
      status: values?.status == "active" ? "blocked" : "active",
    };
    try {
      const res = await updateStatus(payload).unwrap();
      if (res.success) {
        toast.success(
          `${values.name} ${values?.status == "blocked" ? "unblocked" : "Blcoked"} successfully!`,
        );
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // Page change handler
  const handlePageChange = (page) => {
    // Ensure page stays within valid bounds
    const totalPages = data?.meta?.totalPage || 1;
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  // ====================delete user ==================

  const handleDelete = async (values) => {
    const payload = values?._id;

    try {
      const res = await deleteUser(payload).unwrap();
      if (res.success) {
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // Table Columns (unchanged)
  const columns = [
    { title: "Serial", dataIndex: "key", render: (value) => `#${value}` },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => {
        // Helper function to validate URL
        const isValidUrl = (url) => {
          if (!url) return false;
          return (
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("/")
          );
        };

        // Get the first letter of the name (uppercase)
        const firstLetter = value ? value.charAt(0).toUpperCase() : "";

        // Determine if the image is valid
        const hasValidImage = isValidUrl(record?.userImg);

        return (
          <div className="flex-center-start gap-x-2">
            {hasValidImage ? (
              <Image
                src={record?.userImg}
                alt="User avatar"
                width={40}
                height={40}
                className="aspect-square h-auto w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#cbf9f2] to-foundation-accent-400 text-lg font-medium text-white">
                {firstLetter}
              </div>
            )}
            <p className="font-medium">{value}</p>
          </div>
        );
      },
    },
    { title: "Email", dataIndex: "email" },
    { title: "Date", dataIndex: "date" },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <div>
          <Tag color={value === "active" ? "#32CD32" : "#F16365"}>{value}</Tag>
        </div>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                SetSelecteduser(record);
                setProfileModalOpen(true);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>
          <Tooltip title="Block User">
            <CustomConfirm
              title={`${record?.status == "blocked" ? "Unblock User" : "Blocked User"}`}
              description={`Are you sure to ${record?.status == "blocked" ? "Unblock" : "Blocked"} this user?`}
              loading={updating}
              onConfirm={() => handleBlockUser(record)}
            >
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
          <Tooltip title="Delete User">
            <CustomConfirm
              title={"Delete User"}
              description={`Are you sure to delete this user?`}
              loading={Deleteting}
              onConfirm={() => handleDelete(record)}
            >
              <button>
                <Trash color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Calculate total pages safely
  const totalPages = data?.meta?.totalPage || 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#1B70A6", colorInfo: "#1B70A6" } }}
    >
      <div className="mb-3 ml-auto w-1/3 gap-x-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !rounded-lg !border !text-base"
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={tabledata}
        scroll={{ x: "100%" }}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
          showTotal: (total) => `Total ${total} users`,
        }}
        loading={isLoading}
      />

      <ProfileModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        user={selectedUser}
      />
    </ConfigProvider>
  );
}
