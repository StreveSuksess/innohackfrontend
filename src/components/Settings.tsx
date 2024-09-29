import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DialogClose } from "@/components/ui/dialog.tsx";
import { useActions } from "@/hooks/useActions.ts";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { useUpdateProfileMutation } from "@/services/userApi.ts";
import { useForm } from "react-hook-form";


const Settings = () => {
  const { register, handleSubmit } = useForm();
  const [updateProfile] = useUpdateProfileMutation();
  //@ts-ignore
  const { updateProfile: updateProfileLocal } = useActions();
  //@ts-ignore
  const dateOfBirth = useAppSelector((state) => state?.user.dateOfBirth);

  const onSubmit = async (data: any) => {
    await updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: dateOfBirth,
    });
    updateProfileLocal({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: dateOfBirth,
    });
  };

  return (
    <Modal title="Change name" description="Change your account information">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Label htmlFor="firstname" className="sr-only">
            Firstname
          </Label>

          <Input
            {...register("firstName")}
            id="firstname"
            placeholder="Firstname"
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="lastname" className="sr-only">
            Lastname
          </Label>

          <Input
            {...register("lastName")}
            id="lastname"
            placeholder="Lastname"
          />
        </div>

        <DialogClose>
          <Button type={"submit"} className="w-full">
            Save
          </Button>
        </DialogClose>
      </form>
    </Modal>
  );
};

export default Settings;
