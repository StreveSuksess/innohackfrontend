import { useActions } from "@/hooks/useActions.ts";
import { useGetProjectQuery } from "@/services/projectsApi.ts";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";


export const Desks = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useGetProjectQuery({ projectId: projectId });
  const { setProject } = useActions();

  useEffect(() => {
    if (isLoading) return;
    console.log(data);
    if (data) {
      setProject({
        // @ts-ignore
        projectId: projectId,
        // @ts-ignore
        project: {
          ...data,
          owner: "X",
          members: data.members.map((member) => {
            return {
              id: member.id,
              role: member.role,
              name: member.user.firstName + " " + member.user.lastName,
              email: member.user.email,
            };
          }),
        },
      });
    }
  }, [isLoading]);

  return data && <Outlet />;
};
