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
  const { data } = useGetContentsQuery();
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
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-1/3 space-y-3 rounded-lg border bg-white p-10 shadow-md">
        <h1 className="text-2xl">Unlock Amount</h1>
        <h1 className="text-3xl font-bold text-green-500">
          ${value ? value : "No unlock amount set yet."}
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
