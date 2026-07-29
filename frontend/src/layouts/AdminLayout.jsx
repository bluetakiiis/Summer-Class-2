import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

function AdminLayout({
  sidebarOpen,
  setSidebarOpen,
  isBlueTheme,
  setIsBlueTheme,
}) {
  return (
    <div
      className={`flex h-screen w-full flex-col overflow-hidden ${
        isBlueTheme ? "blue-theme" : ""
      }`}
      style={{
        backgroundColor: "var(--background)",
        transition: "background-color .3s ease",
      }}
    >
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isBlueTheme={isBlueTheme}
        setIsBlueTheme={setIsBlueTheme}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}

        <main className="relative flex-1 overflow-y-auto px-5 py-8">
          <div className="mx-auto flex max-w-300 flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
