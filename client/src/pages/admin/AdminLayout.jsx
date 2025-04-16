import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
