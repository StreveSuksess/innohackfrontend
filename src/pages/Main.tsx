import Sidebar from "@/components/Sidebar";
import SidebarSheet from "@/components/SidebarSheet";
import { useActions } from "@/hooks/useActions.ts";
import { useGetProjectsQuery } from "@/services/projectsApi.ts";
import { IProject } from "@/types/projectTypes.ts";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const Main = () => {
  const { data, isLoading } = useGetProjectsQuery(null);
  const { setProjects } = useActions();

  useEffect(() => {
    if (isLoading || !data) return;
    setProjects({
      projects: data.data.map((project) => {
        const newProject: IProject = {
          id: project.id,
          name: project.name,
          description: project.description,
          owner: project.creator.firstName,
          members: [],
          desks: [],
        };
        return newProject;
      }),
    });
  }, [data, isLoading]);

  if (isLoading) return <Loader />;

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
