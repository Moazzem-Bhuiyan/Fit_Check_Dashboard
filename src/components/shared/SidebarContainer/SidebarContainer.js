"use client";

import "./Sidebar.css";
import logo from "@/assets/logos/logo.png";
import { Menu } from "antd";
import userAvatar from "@/assets/images/user-avatar-lg.png";
import Sider from "antd/es/layout/Sider";
import { CircleDollarSign, Lock } from "lucide-react";
import { ScrollText } from "lucide-react";
import { LogOut } from "lucide-react";
import { SlidersVertical } from "lucide-react";
import { CircleUser } from "lucide-react";
import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import toast from "react-hot-toast";
import { useGetMyProfileQuery } from "@/redux/api/authApi";

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isLoading } = useGetMyProfileQuery();
  const user = data?.data;

  // Logout handler
  const onClick = (e) => {
    if (e.key === "logout") {
      dispatch(logout());
      router.refresh();
      router.push("/login");
      toast.success("Logout successful");
    }
  };

  const navLinks = [
    {
      key: "dashboard",
      icon: <House size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Overview</Link>,
    },
    {
      key: "account-details",
      icon: <CircleUser size={21} strokeWidth={2} />,
      label: <Link href={"/admin/account-details"}>User Details</Link>,
    },
    {
      key: "earnings",
      icon: <CircleDollarSign size={21} strokeWidth={2} />,
      label: <Link href={"/admin/earnings"}>Earnings Overview</Link>,
    },
    {
      key: "unloack_Payments",
      icon: <Lock size={21} strokeWidth={2} />,
      label: <Link href={"/admin/unlock-ammount"}>Unlock-Ammount</Link>,
    },
    {
      key: "settings",
      icon: <SlidersVertical size={21} strokeWidth={2} />,
      label: "Settings",
      children: [
        {
          key: "privacy-policy",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/privacy-policy">Privacy Policy</Link>,
        },
        {
          key: "terms-conditions",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/terms-conditions">Terms & Conditions</Link>,
        },
      ],
    },

    {
      key: "logout",
      icon: <LogOut size={21} strokeWidth={2} />,
      label: <Link href="/login">Logout</Link>,
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/admin/", "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "4px"}`,
        paddingBlock: "30px",
        backgroundColor: "#152531",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col items-center justify-center gap-y-5">
        <Link href={"/"}>
          {collapsed ? (
            // Logo small
            <Image
              src={logo}
              alt="Logo Of Before After Story"
              className="h-10 w-auto"
            />
          ) : (
            <Image
              src={logo}
              width={2500}
              height={2500}
              alt="Logo Of Before After Story"
              className="h-[150px] w-auto"
            />
          )}
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu !min-h-[calc(100vh-300px)] space-y-2.5 !border-none !bg-transparent"
        items={navLinks}
      />
      <Link href={"/admin/profile"} className="group gap-x-2">
        <div className="flex items-center gap-2 border-t border-gray-200 px-4 py-2">
          <Image
            src={user?.photoUrl || userAvatar}
            alt="Admin avatar"
            width={52}
            height={52}
            className="aspect-square rounded-full border-2 border-primary-green p-0.5 group-hover:border"
          />
          <div>
            <h4 className="text-lg font-semibold text-white">
              {user?.name} <span className="text-sm text-green-500">Admin</span>{" "}
            </h4>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
      </Link>
    </Sider>
  );
};

export default SidebarContainer;
