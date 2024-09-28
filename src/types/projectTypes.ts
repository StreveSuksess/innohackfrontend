export interface IProject {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: TMember[];
  desks: TDesk[];
}

export interface ITask {
  id: string;
  name: string;
  status: "Completed" | "In process" | "Failed";
}

export type TDesk = {
  name: string;
  projects: IProject[];
  id: string;
};

export type TMember = {
  id: string;
  role: string;
  name: string;
  email: string;
};
