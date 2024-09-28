import Modal from "./Modal";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActions } from "@/hooks/useActions.ts";
import { useAddProjectMutation } from "@/services/projectsApi.ts";
import { Loader } from "lucide-react";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";


interface CreateEntityProps {
  title: string;
  description: string;
  className?: string;
  isName?: boolean;
}

const CreateEntity = ({
  title,
  description,
  className,
  children,
  isName = true,
}: PropsWithChildren<CreateEntityProps>) => {
  const { register, handleSubmit } = useForm<any>();
  const [addProjectFetch, { isLoading }] = useAddProjectMutation();
  const { addProject } = useActions();

  const onSubmit = async (data: { name: string; description: string }) => {
    try {
      const response = await addProjectFetch(data);
      addProject(response);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) <Loader />;

  return (
    <Modal title={title} description={description} className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor={title} className="sr-only">
          {title} name
        </Label>

        <Input
          {...register("title")}
          id={title}
          placeholder={`${title} ${isName ? "name" : ""}`}
        />
        <Input
          {...register("description")}
          placeholder="Description"
          id="description"
          className={"mt-2"}
        />
      </form>
      {children}
    </Modal>
  );
};

export default CreateEntity;
