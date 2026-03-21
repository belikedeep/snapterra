import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar onSuccess={handleSuccess} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet context={{ refreshTrigger }} />
      </main>
    </div>
  );
};

export default MainLayout;

export interface LayoutContextType {
  refreshTrigger: number;
}
