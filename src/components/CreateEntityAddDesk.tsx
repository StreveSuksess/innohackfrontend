import Modal from "./Modal";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "@/components/ui/button.tsx";
import { DialogClose, DialogFooter } from "@/components/ui/dialog.tsx";
import { useActions } from "@/hooks/useActions.ts";
import { useAddDeskMutation } from "@/services/projectsApi.ts";
import { Loader } from "lucide-react";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";


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
  const [addDeskFetch, { isLoading }] = useAddDeskMutation();
  const { addDesk } = useActions();
  const { projectId } = useParams();

  const onSubmit = async (data: { name: string }) => {
    try {
      console.log(data);
      const response = await addDeskFetch({
        projectId: projectId,
        name: data.name,
      });
      console.log(response);
      addDesk({
        id: response.data.id,
        name: response.data.title,
        projectId: response.data.project.id,
      });
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

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              {...register("name")}
              id={title}
              placeholder={`${title} ${isName ? "name" : ""}`}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between mt-5">
          <DialogClose asChild>
            <Button type="submit" variant="default">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
      {children}
    </Modal>
  );
};

export default CreateEntity;
