"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SystemStatsProps {
  data: {
    cpu_percent: number;
    memory_percent: number;
    disk_usage: number;
  };
}

export function SystemStats({ data }: SystemStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques Système</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium">CPU</span>
            <span>{data.cpu_percent}%</span>
          </div>
          <Progress value={data.cpu_percent} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium">Mémoire</span>
            <span>{data.memory_percent}%</span>
          </div>
          <Progress value={data.memory_percent} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-medium">Disque</span>
            <span>{data.disk_usage}%</span>
          </div>
          <Progress value={data.disk_usage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
