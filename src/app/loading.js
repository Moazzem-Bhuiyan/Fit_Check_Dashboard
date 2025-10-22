import CustomLoader from "@/components/CustomLoader/CustomLoader";
import { ConfigProvider } from "antd";

export default function loading() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      <div className="flex-center h-[75vh]">
        <CustomLoader className="h-12 w-12 text-primary-blue" />
      </div>
    </ConfigProvider>
  );
}
