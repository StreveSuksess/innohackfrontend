import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Modal {
  title: string;
  description: string;
  className?: string;
}

const Modal = ({
  title,
  description,
  children,
  className,
}: PropsWithChildren<Modal>) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <button
          className={cn(
            "flex items-center w-full px-2 py-1.5 text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors duration-200",
            className
          )}
        >
          {title}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
