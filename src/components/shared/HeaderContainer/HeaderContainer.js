"use client";

import { Button } from "antd";
import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout } from "antd";
import { AlignJustify } from "lucide-react";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
const { Header } = Layout;

export default function HeaderContainer({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const navbarTitle = pathname.split("/admin")[1];
  const { data, isLoading } = useGetMyProfileQuery();
  const user = data?.data;

  return (
    <Header
      style={{
        backgroundColor: "#FFFFFF",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 0,
        paddingRight: "40px",
      }}
    >
      {/* Collapse Icon */}
      <div className="flex items-center gap-x-2">
        <Button
          type="text"
          icon={<AlignJustify strokeWidth={3} size={25} />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <h1 className="-mt-3 font-dmSans text-xl font-semibold capitalize">
          {navbarTitle.length > 1
            ? navbarTitle.replaceAll("/", " ").replaceAll("-", " ")
            : "dashboard"}
        </h1>
      </div>

      {/* Right --- notification, user profile */}
      <div className="flex items-center gap-x-6">
        {/* <button>
          <Search color="#1C1B1F" size={22} strokeWidth={2.5} />
        </button> */}

        <Link href="/admin/notification" className="relative !leading-none">
          {/* Notification dot indicator */}
          <div className="absolute -right-1 -top-1.5 size-3 rounded-full bg-[#000000]" />

          <Bell fill="#1C1B1F" stroke="#1C1B1F" size={22} />
        </Link>
        {/* User */}
        <Link
          href={"/admin/profile"}
          className="group flex items-center gap-x-2 text-black hover:text-primary-blue"
        >
          <div>
            <h4 className="text-lg font-semibold">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  {" "}
                  Hi {user?.name} <span className="text-2xl">🙌</span>
                </>
              )}
            </h4>
          </div>
        </Link>
      </div>
    </Header>
  );
}
