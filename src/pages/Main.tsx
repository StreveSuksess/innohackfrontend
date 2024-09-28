import Sidebar from "@/components/Sidebar";
import SidebarSheet from "@/components/SidebarSheet";
import { useActions } from "@/hooks/useActions.ts";
import { useGetProjectsQuery } from "@/services/projectsApi.ts";
import { useGetUserInfoQuery } from "@/services/userApi.ts";
import { IProject } from "@/types/projectTypes.ts";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


const Main = () => {
  const { data: projectsData, isLoading: isLoadingProjects } =
    useGetProjectsQuery(null);
  const { data: userData, isLoading: isLoadingUserInfo } =
    useGetUserInfoQuery(null);
  // @ts-ignore
  const { setProjects, setUser } = useActions();

  useEffect(() => {
    if (isLoadingProjects && isLoadingUserInfo && !projectsData && !userData)
      return;

    if (userData !== null) {
      // @ts-ignore
      setUser(userData);
    }

    // @ts-ignore
    if (projectsData?.length > 0) {
      setProjects({
        // @ts-ignore
        projects: projectsData.map((project) => {
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
    }
  }, [projectsData, userData, isLoadingProjects]);

  if (isLoadingProjects) return <Loader />;

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
