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
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


export const History: React.FC = () => {
  const { deskId } = useParams();
  const { data: historyData, isLoading } = useGetProjectHistoryQuery(deskId);

  useEffect(() => {
    if (isLoading) return;
    console.log(historyData);
  });

  if (isLoading) return <Loader />;

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
              <TableHead>Type</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.slice(0, 20).map((data: any) => (
              <TableRow key={data[0].timestamp}>
                <TableCell>{data[0].revision_id}</TableCell>
                <TableCell>{data[0].name}</TableCell>
                <TableCell>{data[0].status}</TableCell>
                <TableCell>{data[0].revision_type}</TableCell>
                <TableCell>
                  {new Date(
                    data[0].revision_timestamp * 1
                  ).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
