"use client";
import FormWrapper from "@/components/Form/FormWrapper";
import UOtpInput from "@/components/Form/UOtpInput";
import { useVerifyEmailMutation } from "@/redux/api/authApi";
import { otpSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function VerifyOtpForm() {
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const onSubmit = async (data) => {
    try {
      const res = await verifyOtp(data).unwrap();
      if (res?.success == true) {
        toast.success(res?.message || "OTP verified successfully");
        router.push("/set-new-password");
      } else {
        throw new Error(res?.message || "Verification failed");
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
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
        <h4 className="text-3xl font-semibold text-white">Verify OTP</h4>
        <p className="text-white">
          Enter the otp that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(otpSchema)}>
        <UOtpInput name="otp" />

        <Button
          type="primary"
          size="large"
          loading={isLoading}
          className="!h-10 w-full !font-semibold"
          htmlType="submit"
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
