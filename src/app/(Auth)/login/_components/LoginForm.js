"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import logo from "@/assets/logos/logo.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/redux/api/authApi";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { setUser } from "@/redux/features/authSlice";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { requestFcmToken, initializeMessaging } from "@/lib/firebaseClient";
import { useEffect } from "react";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSignInMutation();

  // Initialize Firebase messaging on component mount
  useEffect(() => {
    initializeMessaging().then(() => {
      console.log("Firebase messaging initialized");
    });
  }, []);

  const onLoginSubmit = async (data) => {
    const fcmToken = await requestFcmToken();
    // console.log("FCM Token================:", fcmToken);
    try {
      const payload = {
        ...data,
        fcmToken: fcmToken || null,
      };
      const res = await signin(payload).unwrap();

      if (res?.data?.accessToken) {
        const decodedToken = jwtDecode(res.data.accessToken);
        const userRole = decodedToken?.role;
        if (userRole !== "admin") {
          toast.error("You are not authorized to access this site");
          return;
        }
        toast.success("Login successful");
        dispatch(
          setUser({
            token: res.data.accessToken,
          }),
        );
        router.push("/admin/dashboard");
      } else {
        toast.error(res?.message || "Login failed: No access token received");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="w-full rounded-md px-6 py-8 shadow-none shadow-primary-blue/10">
      <section className="mb-8 space-y-2">
        <Image
          src={logo}
          alt="logo"
          width={2000}
          height={2000}
          className="h-auto w-[30%]"
        />
        <h4 className="text-3xl font-semibold text-white">Welcome back!</h4>
        <p className="text-white">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
          labelStyles={{ color: "white" }}
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
          labelStyles={{ color: "white" }}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          disabled={isLoading}
          loading={isLoading}
          icon={isLoading ? <CustomLoader className="h-5 w-5" /> : null}
          style={{
            background:
              "linear-gradient(90deg, rgba(34, 197, 94, 1) 0%, rgba(27, 112, 166, 1) 100%)",
          }}
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="mt-2 block text-center font-medium text-white hover:text-primary-blue/85"
        >
          I forgot my password
        </Link>
      </FormWrapper>
    </div>
  );
}
