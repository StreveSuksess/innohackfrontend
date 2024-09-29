import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProjectHistoryQuery } from "@/services/projectsApi.ts";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


type VersionType = {
  versionId: number;
  name: string;
  status: "In process" | "Completed" | "Failed";
  timestamp: string;
};

type TaskType = {
  id: number;
  name: string;
  status: "In process" | "Completed" | "Failed";
  creator: string;
  createdAt: string;
  versions: VersionType[];
};

type HistoryProps = {
  tasks: TaskType[];
  selectedTask: TaskType | null;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<number | null>>;
  rollbackTask: (taskId: number, version: VersionType) => void;
};

export const History: React.FC<HistoryProps> = () => {
  const { deskId } = useParams();
  const { data: historyData, isLoading } = useGetProjectHistoryQuery(deskId);

  useEffect(() => {
    if (isLoading) return;
    console.log(historyData);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={"x"}>
              <TableCell>{"x"}</TableCell>
              <TableCell>{"name"}</TableCell>
              <TableCell>{"status"}</TableCell>
              <TableCell>{"timestamp"}</TableCell>
              <TableCell>{"timestamp"}</TableCell>
              <TableCell>{"timestamp"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
