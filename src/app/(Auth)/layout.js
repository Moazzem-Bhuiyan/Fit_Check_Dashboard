import Image from "next/image";
import React from "react";
import authbg from "@/assets/logos/authbg.png";

export default function AuthLayout({ children }) {
  return (
    <main className="relative flex h-screen items-center justify-center bg-white">
      <div className="flex h-full w-full">
        {/* Left side image */}
        <div className="flex flex-1 items-center justify-center">
          <Image
            src={authbg}
            alt="background"
            width={6000}
            height={6000}
            className="min-h-[300px] w-[600px] object-cover"
          />
        </div>

        {/* Right side with children */}
        <div
          className="flex h-full flex-1 items-center justify-center p-6"
          style={{
            background: "linear-gradient(180deg, #00172A 0%, #013F63 100%)",
          }}
        >
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </div>
    </main>
  );
}
