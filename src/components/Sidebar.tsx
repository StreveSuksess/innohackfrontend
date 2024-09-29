import CreateEntity from "./CreateEntity";
import ProfileLink from "./ProfileLink";
import { Input } from "./ui/input";
import CreateEntityAddDesk from "@/components/CreateEntityAddDesk.tsx";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ChevronLeftIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Sidebar = () => {
  const { projectId, deskId } = useParams();
  const navigate = useNavigate();
  const [showProjects, setShowProjects] = useState(deskId ? true : false);
  const projects = useAppSelector((state) => state.projects.projects);
  const userData = useAppSelector((state) => state.user);
  const projectName =
    projects.find((project) => project.id === projectId)?.name ?? "Project";

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const toggleView = () => {
    setShowProjects(false);
    navigate("/tasks");
  };

  // @ts-ignore
  return (
    <div className="fixed overflow-hidden left-2 top-2 flex flex-col h-[calc(100vh-16px)] w-64 bg-zinc-900 text-white rounded-xl">
      <div className="absolute top-[120px] left-[30px] bg-slate-700 blur-[80px] w-[150px] h-[150px] rounded-full" />

      <div className="flex items-center justify-between px-6 py-6">
        <h1 className="text-2xl font-bold">
          {showProjects ? projectName : "Projects"}
        </h1>

        <button
          onClick={toggleView}
          className="p-1 rounded-md hover:bg-zinc-800 transition-colors duration-200"
        >
          {showProjects && <ChevronLeftIcon className="w-6 h-6" />}
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          className={`absolute inset-0 transform transition-transform duration-300 ${
            showProjects ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ScrollArea className="flex-1 px-2">
            <nav className="space-y-2">
              {projects
                .find((project) => project.id === projectId)
                ?.desks.map((desk) => {
                  //@ts-ignore
                  return (
                    <Link
                      key={desk.id}
                      to={`/project/${projectId}/desk/${desk.id}`}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors duration-200"
                    >
                      <Squares2X2Icon className="w-5 h-5 mr-3" />
                      {desk.title ?? desk.name}
                    </Link>
                  );
                })}

              <CreateEntityAddDesk
                title="Create a desk"
                description="Create a new desk"
                className="bg-white text-black flex justify-center items-center hover:bg-white"
              />

              <CreateEntity
                title="Edit project"
                description="Edit your project information"
                className="bg-white text-black flex justify-center items-center hover:bg-white"
              >
                <Input placeholder="Edit project description" />
              </CreateEntity>
            </nav>
          </ScrollArea>
        </div>

        <div
          className={`absolute inset-0 transform transition-transform duration-300 ${
            showProjects ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <ScrollArea className="flex-1 px-2">
            <nav className="space-y-2">
              {projects.map((project) => (
                <Link
                  key={project.name}
                  to={"/project/" + project.id}
                  onClick={() => setShowProjects(true)}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors duration-200"
                >
                  <Squares2X2Icon className="w-5 h-5 mr-3" />
                  {project.name}
                </Link>
              ))}

              <CreateEntity
                title="Create a project"
                description="Create a new project"
                className="bg-white text-black flex justify-center items-center hover:bg-white"
              >
                <></>
              </CreateEntity>
            </nav>
          </ScrollArea>
        </div>
      </div>

      <div className="py-3">
        <ProfileLink
          avatar={
            //@ts-ignore
            userData?.avatarURL
              ? //@ts-ignore
                userData.avatarURL
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKNwJz-vhaZVskyf7rLnoAVlsZSQz7oYkA4XrR_-PD53HLb1-UT2IC4q6V-s_rmPrelMo&usqp=CAU"
          }
          name={
            //@ts-ignore
            userData?.firstName
              ? //@ts-ignore
                userData.firstName + " " + userData.lastName
              : "User"
          }
          //@ts-ignore
          email={userData ? userData.email : "mail@mail.ru"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
