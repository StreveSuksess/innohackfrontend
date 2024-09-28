import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex bg-muted/40">
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
        }}
        className="w-full"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
