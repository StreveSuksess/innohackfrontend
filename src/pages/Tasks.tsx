import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import GaantPage from "@/components/GaantPage";
import { History } from "@/components/History.tsx";
import { Member } from "@/components/Member";
import { Task } from "@/components/Task";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActions } from "@/hooks/useActions.ts";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { useAddTaskMutation, useGetTaskQuery } from "@/services/projectsApi.ts";
import axios from "axios";
import Cookies from "js-cookie";
import { ListFilter, Search } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";


export const Tasks: FC = () => {
  const { deskId, projectId } = useParams();
  const tasks = useAppSelector((state) => {
    const projectIndex = state.projects.projects.findIndex(
      (project) => project.id === projectId
    );
    const deskIndex = state.projects?.projects[projectIndex]?.desks.findIndex(
      (desk) => desk.id === deskId
    );

    return state.projects.projects[projectIndex]?.desks[deskIndex]?.tasks ?? [];
  });

  const currentProject = useAppSelector(
    (state) => state.projects.projects
  ).find((project) => project.id === projectId);
  const currentDesk = currentProject?.desks.find((desk) => desk.id === deskId);

  const projectName = currentProject?.name ?? "Project";

  const deskName = currentDesk?.title ?? "Desk";
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedFilters, setSelectedFilters] = useState<{
    status: string[];
  }>({
    status: [],
  });

  const members =
    useAppSelector((state) => state.projects.projects).find(
      (project) => project.id === projectId
    )?.members ?? [];

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    setSelectedFilters((prevFilters) => {
      const newStatusFilters = checked
        ? [...prevFilters.status, status]
        : prevFilters.status.filter((s) => s !== status);
      return {
        ...prevFilters,
        status: newStatusFilters,
      };
    });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm = task.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatusFilter =
      selectedFilters.status.length === 0 ||
      selectedFilters.status.includes(task.status);
    return matchesSearchTerm && matchesStatusFilter;
  });

  const [email, setEmail] = useState("");
  const addMember = async () => {
    const token = Cookies.get("Authorization");
    await axios.post(
      `${import.meta.env.VITE_API_URL}/project/`,
      { email },
      { headers: { Authorization: token } }
    );
    setEmail("");
  };
  const { register, handleSubmit } = useForm();
  const [addTaskFetch] = useAddTaskMutation();
  const { addTask, setTasks } = useActions();
  // @ts-ignore
  const userEmail = useAppSelector((state) => state.user.email);
  const { data: taskData, isLoading } = useGetTaskQuery(deskId);
  const [dataTaskFrom, setData] = useState({ from: null, to: null });

  const onSubmit = async (data: any) => {
    try {
      const response = await addTaskFetch({
        name: data.name,
        description: "description",
        deskId: deskId,
        workerEmail: userEmail,
        start: dataTaskFrom.from,
        end: dataTaskFrom.to,
      });

      addTask({
        name: response.data.name,
        start: response.data.start ?? null,
        end: response.data.end ?? null,
        description: response.data.description,
        status: response.data.status,
        // @ts-ignore
        projectId: projectId,
        // @ts-ignore
        deskId: deskId,
      });
    } catch (error) {
      console.log(error);
      console.log(tasks);
    }
  };

  useEffect(() => {
    if (isLoading || !taskData) return;
    setTasks({
      tasks: taskData,
      // @ts-ignore
      projectId: projectId,
      // @ts-ignore
      deskId: deskId,
    });
  }, [isLoading]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col sm:gap-4 sm:py-4 w-full">
        <header className="top-0 z-30 flex items-center gap-4 static h-auto border-0 bg-transparent px-6">
          <Breadcrumb className="md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">{projectName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">{deskName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="tasks">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="members">Project Members</TabsTrigger>
                <TabsTrigger value="gaant">Gaant Chart</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="tasks">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between w-full">
                  <CardTitle>Tasks</CardTitle>

                  <div className="ml-auto flex items-center gap-2">
                    <div className="relative ml-auto flex-1 md:grow-0">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        value={searchTerm}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setSearchTerm(e.target.value)
                        }
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={selectedFilters.status.includes(
                            "IN_PROGRESS"
                          )}
                          onCheckedChange={(checked: boolean) =>
                            handleStatusFilterChange("IN_PROGRESS", checked)
                          }
                        >
                          In progress
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedFilters.status.includes("COMPLETED")}
                          onCheckedChange={(checked: boolean) =>
                            handleStatusFilterChange("COMPLETED", checked)
                          }
                        >
                          Completed
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedFilters.status.includes("FAILED")}
                          onCheckedChange={(checked: boolean) =>
                            handleStatusFilterChange("FAILED", checked)
                          }
                        >
                          Failed
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={selectedFilters.status.includes(
                            "NOT_STARTED"
                          )}
                          onCheckedChange={(checked: boolean) =>
                            handleStatusFilterChange("NOT_STARTED", checked)
                          }
                        >
                          Not started
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog>
                      <DialogTrigger>
                        <Button className="w-full">Add task</Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add task</DialogTitle>

                          <DialogDescription>
                            Add a new task to your desk
                          </DialogDescription>
                        </DialogHeader>

                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="w-full"
                        >
                          <Input
                            {...register("name")}
                            placeholder="Task"
                            className="mb-2"
                          />

                          <DatePickerWithRange
                            setData={setData}
                            className="w-full"
                          />

                          <DialogFooter className="gap-2 sm:justify-between mt-5">
                            <DialogClose asChild>
                              <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                              >
                                Save
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Creator
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTasks.map((task) => (
                        <Task
                          key={task.id}
                          task={task}
                          updateTask={() => {}}
                          deleteTask={() => {}}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <History />
            </TabsContent>

            <TabsContent value="members">
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                  <CardTitle>Project Members</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-8">
                  {members.map((member) => (
                    <Member key={member.id} member={member} />
                  ))}

                  <Dialog>
                    <DialogTrigger>
                      <Button className="w-full">Add member</Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite user</DialogTitle>

                        <DialogDescription>
                          Invite other users to your project
                        </DialogDescription>
                      </DialogHeader>

                      <form className="w-full">
                        <Input
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <DialogFooter className="gap-2 sm:justify-between mt-5">
                          <DialogClose asChild>
                            <Button
                              type="submit"
                              variant="default"
                              className="w-full"
                              onClick={addMember}
                            >
                              Save
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gaant">
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                  <CardTitle>Gaant Chart</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-8">
                  <GaantPage />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
