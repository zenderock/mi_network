"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ConnectionsTableProps {
  connections: Array<{
    local_address: string;
    remote_address: string;
    status: string;
    pid?: number;
  }>;
}

export function ConnectionsTable({ connections }: ConnectionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adresse locale</TableHead>
            <TableHead>Adresse distante</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>PID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connections.map((conn, index) => (
            <TableRow key={index}>
              <TableCell>{conn.local_address}</TableCell>
              <TableCell>{conn.remote_address || "-"}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    conn.status === "ESTABLISHED" ? "default" : "secondary"
                  }
                >
                  {conn.status}
                </Badge>
              </TableCell>
              <TableCell>{conn.pid || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
