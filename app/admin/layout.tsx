import { AppBarItem } from "@/components/AppBarItem";
import { AppBarLayout } from "@/components/AppBarLayout";
import { LogOut } from "lucide-react";
import React from "react";
const AdminLayoutActions = () => {
  return [
    <AppBarItem
      key="signout"
      text="Sign Out"
      url="/api/auth/signout"
      icon={<LogOut />}
    />,
  ];
};

function AdminLayout({ children }) {
  return (
    <AppBarLayout title="Admin" actions={<AdminLayoutActions />}>
      <div className="pt-2 lg:pt-4">
        <div className="m-1 lg:m-3">{children}</div>
      </div>
    </AppBarLayout>
  );
}

export default AdminLayout;
