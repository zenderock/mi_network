"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

interface FirewallRulesTableProps {
  rules: Record<string, string[]>;
  onDelete: (ruleNumber: string) => void;
}

export function FirewallRulesTable({
  rules,
  onDelete,
}: FirewallRulesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chaîne</TableHead>
            <TableHead>Règle</TableHead>
            <TableHead>Protocole</TableHead>
            <TableHead>Port</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Action</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(rules).map(([chain, chainRules]) =>
            chainRules.map((rule, index) => {
              const match = rule.match(
                /(ACCEPT|DROP|REJECT).*?(tcp|udp).*?dpt:(\d+).*?src:([\d.]+)/
              );
              return (
                <TableRow key={`${chain}-${index}`}>
                  <TableCell className="font-medium">{chain}</TableCell>
                  <TableCell>{rule}</TableCell>
                  <TableCell>{match?.[2] || "-"}</TableCell>
                  <TableCell>{match?.[3] || "-"}</TableCell>
                  <TableCell>{match?.[4] || "0.0.0.0/0"}</TableCell>
                  <TableCell>{match?.[1] || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(index.toString())}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
