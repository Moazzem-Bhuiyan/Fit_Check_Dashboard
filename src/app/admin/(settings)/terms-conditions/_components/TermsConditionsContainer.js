"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";
import { Button } from "antd";
import { Edit } from "lucide-react";
import toast from "react-hot-toast";


export default function TermsConditionsContainer() {
  // get content api handaller
  const { data } = useGetContentsQuery();
  const value = data?.data?.[0]?.termsAndConditions;

  // update contetnt api handeller

  const [updateContent, { isLoading: updating }] = useUpdateContentMutation();

  const handleSubmit = async (values) => {
    try {
      const res = await updateContent(values).unwrap();
      if (res.success) {
        toast.success("Content Update Successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          name="termsAndConditions"
          placeholder="Note: Enter details about your terms and conditions here."
          value={value}
        />

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-full rounded-xl"
          icon={<Edit size={18} />}
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
    </section>
  );
}
