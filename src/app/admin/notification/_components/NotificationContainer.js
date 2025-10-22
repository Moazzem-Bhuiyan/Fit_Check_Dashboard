"use client";

import NotificationCard from "./NotificationCard";
import { Button, Empty } from "antd";
import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import toast from "react-hot-toast";

export default function NotificationContainer() {
  const { data: notificationRes } = useGetMyNotificationQuery();
  const notificationData = notificationRes?.data || [];
  const [updateNotification, { isLoading: updateLoading }] =
    useMarkAsReadMutation();
  const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

  const handelToRead = async () => {
    try {
      await updateNotification({}).unwrap();
      toast.success("All Notification successfully mark as read");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handelDelete = async () => {
    try {
      await deleteNotification({}).unwrap();
      toast.success("All Notification Deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="mx-auto mb-10 w-3/4">
      <section className="flex-center-between mb-10">
        <h4 className="text-3xl font-semibold">Notifications</h4>

        <div className="space-x-3">
          <Button onClick={handelToRead} loading={updateLoading} type="primary">
            Mark as read
          </Button>
          <Button
            loading={isLoading}
            onClick={handelDelete}
            className="!bg-danger !text-white"
          >
            Delete all
          </Button>
        </div>
      </section>
      <section className="space-y-8">
        {notificationData?.length > 0 ? (
          notificationData?.map((notification) => (
            <NotificationCard
              key={notification.key}
              notification={notification}
            />
          ))
        ) : (
          <Empty description="No notification found" />
        )}
      </section>
    </div>
  );
}
