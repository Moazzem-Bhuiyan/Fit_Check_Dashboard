"use client";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UnlockAmmount = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetContentsQuery();
  const value = data?.data?.[0]?.unlockAmount;
  // update contetnt api handeller
  const [updateContent, { isLoading: updating }] = useUpdateContentMutation();

  const handleSubmit = async (values) => {
    try {
      const res = await updateContent(values).unwrap();
      if (res.success) {
        toast.success("Price Update Successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
            {[1].map((i) => (
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
    );
  }
  return (
    <div className="flex h-[calc(100vh-124px)] w-full items-center justify-center">
      <div className="w-1/3 space-y-3 rounded-lg border bg-white p-10 shadow-md">
        <h1 className="text-2xl">Unlock Amount</h1>
        <h1 className="text-3xl font-bold text-green-500">
          ${value ? value : "0.00"}
        </h1>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
          className="mt-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(34, 197, 94, 1) 0%, rgba(27, 112, 166, 1) 100%)",
            color: "#fff",
            width: "100%",
          }}
        >
          Edit price
        </Button>
      </div>

      <Modal
        title="Edit Price"
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        centered
        footer={null}
        width={600}
        style={{ top: 20 }}
      >
        <FormWrapper
          onSubmit={handleSubmit}
          defaultValues={{ unlockAmount: value }}
        >
          <UInput
            name="unlockAmount"
            label="Unlock Amount"
            type="number"
            placeholder="Enter Unlock Amount"
          />
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="w-full rounded-xl"
            loading={updating}
            disabled={updating}
            style={{
              background:
                "linear-gradient(90deg, rgba(34, 197, 94, 1) 0%, rgba(27, 112, 166, 1) 100%)",
            }}
          >
            Save Changes
          </Button>
        </FormWrapper>
      </Modal>
    </div>
  );
};

export default UnlockAmmount;
