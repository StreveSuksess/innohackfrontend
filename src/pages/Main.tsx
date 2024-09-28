import Sidebar from "@/components/Sidebar";
import SidebarSheet from "@/components/SidebarSheet";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex bg-muted/40">
      <div className="flex items-start justify-start pl-3 pt-3 lg:hidden">
        <SidebarSheet />
      </div>

      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="w-full lg:ml-[260px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
