import { Input } from "./ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { useActions } from "@/hooks/useActions.ts";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/services/projectsApi.ts";
import { ITask } from "@/types/projectTypes.ts";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


type TaskProps = {
  task: ITask;
  updateTask: (task: ITask) => void;
  deleteTask: (taskId: number) => void;
};

export const Task: FC<TaskProps> = ({ task }) => {
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [editedTaskName, setEditedTaskName] = useState<string>(task.name);
  const [deleteTaskFetch, {}] = useDeleteTaskMutation();
  const [updateTaskFetch, {}] = useUpdateTaskMutation();
  const { deleteTask: deleteTaskLocal, updateTask: updateTaskLocal } =
    useActions();
  const { deskId, projectId } = useParams();

  const editTask = async () => {
    const updatedTask = { ...task, name: editedTaskName };
    console.log(editedTaskName);
    await updateTaskFetch({
      name: updatedTask.name,
      description: updatedTask.description,
      status: updatedTask.status,
      taskId: updatedTask.id,
    });
    updateTaskLocal({
      name: updatedTask.name,
      taskId: updatedTask.id,
      // @ts-ignore
      deskId: deskId,
      // @ts-ignore
      projectId: projectId,
      status: updatedTask.status,
    });
    setIsEditingTask(false);
  };

  const editStatus = async (status: string) => {
    const updatedTask = { ...task, status };
    await updateTaskFetch({
      name: updatedTask.name,
      description: updatedTask.description,
      status: updatedTask.status,
      taskId: updatedTask.id,
    });
    updateTaskLocal({
      name: updatedTask.name,
      taskId: updatedTask.id,
      // @ts-ignore
      deskId: deskId,
      // @ts-ignore
      projectId: projectId,
      status: updatedTask.status,
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        editTask();
      }
    };

    if (isEditingTask) {
      //@ts-ignore
      document.addEventListener("keydown", onKeyDown);
    } else {
      //@ts-ignore
      document.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      //@ts-ignore
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isEditingTask, editedTaskName]);

  return (
    <TableRow>
      <TableCell className="font-medium">
        {isEditingTask ? (
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditedTaskName(e.target.value)
            }
            value={editedTaskName}
          />
        ) : (
          <span className="font-medium inline-block w-[180px] truncate">
            {task.name}
          </span>
        )}

        {!isEditingTask && (
          <button onClick={() => setIsEditingTask(true)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="inline-block mb-2.5"
            >
              <path
                fill="#fff"
                d="M13.6568542,2.34314575 C14.4379028,3.12419433 14.4379028,4.39052429 13.6568542,5.17157288 L6.27039414,12.558033 C5.94999708,12.87843 5.54854738,13.105727 5.10896625,13.2156223 L2.81796695,13.7883721 C2.45177672,13.8799197 2.12008033,13.5482233 2.21162789,13.182033 L2.78437771,10.8910338 C2.894273,10.4514526 3.12156995,10.0500029 3.44196701,9.72960586 L10.8284271,2.34314575 C11.6094757,1.56209717 12.8758057,1.56209717 13.6568542,2.34314575 Z M10.1212441,4.46435931 L4.14907379,10.4367126 C3.95683556,10.6289509 3.82045738,10.8698207 3.75452021,11.1335694 L3.38388341,12.6161166 L4.86643062,12.2454798 C5.1301793,12.1795426 5.37104912,12.0431644 5.56328736,11.8509262 L11.5352441,5.87835931 L10.1212441,4.46435931 Z M11.5355339,3.05025253 L10.8282441,3.75735931 L12.2422441,5.17135931 L12.9497475,4.46446609 C13.3402718,4.0739418 13.3402718,3.44077682 12.9497475,3.05025253 C12.5592232,2.65972824 11.9260582,2.65972824 11.5355339,3.05025253 Z"
              ></path>
            </svg>
          </button>
        )}
      </TableCell>
      <TableCell>
        <ToggleGroup
          type="single"
          value={task.status}
          onValueChange={(value: string) => {
            editStatus(value);
          }}
        >
          <ToggleGroupItem value="COMPLETED">Completed</ToggleGroupItem>
          <ToggleGroupItem value="IN_PROGRESS">In progress</ToggleGroupItem>
          <ToggleGroupItem value="FAILED">Failed</ToggleGroupItem>
          <ToggleGroupItem value="NOT_STARTED">Not started</ToggleGroupItem>
        </ToggleGroup>
      </TableCell>
      <TableCell className="hidden md:table-cell">Creator</TableCell>
      <TableCell className="hidden md:table-cell">{task.start}</TableCell>
      <TableCell>
        <button
          onClick={async () => {
            await deleteTaskFetch({ taskId: task.id });
            deleteTaskLocal({
              //@ts-ignore
              projectId: projectId,
              //@ts-ignore
              deskId: deskId,
              taskId: task.id,
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash2 h-4 w-4"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line x1="10" x2="10" y1="11" y2="17"></line>
            <line x1="14" x2="14" y1="11" y2="17"></line>
          </svg>
        </button>
      </TableCell>
    </TableRow>
  );
};
