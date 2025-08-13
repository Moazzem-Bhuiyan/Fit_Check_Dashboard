"use client";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { resetPassSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

export default function SetPasswordForm() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Password reset successfully");
        localStorage.removeItem("forgetPasswordToken");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="px-6 py-8">
      <Link
        href="/login"
        className="flex-center-start mb-4 gap-x-2 font-medium text-primary-blue hover:text-primary-blue/85"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold text-white">Set New Password</h4>
        <p className="text-white">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(resetPassSchema)}>
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
          labelStyles={{ color: "white" }}
        />

        <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*************"
          size="large"
          labelStyles={{ color: "white" }}
          className="!mb-0 !h-10"
        />

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={isLoading}
          className="!h-10 w-full !font-semibold"
          style={{
            background:
              "linear-gradient(90deg, rgba(34, 197, 94, 1) 0%, rgba(27, 112, 166, 1) 100%)",
          }}
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
