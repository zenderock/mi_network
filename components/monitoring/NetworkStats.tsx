"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NetworkStatsProps {
  data: {
    bytes_sent_per_sec: number;
    bytes_recv_per_sec: number;
    total_bytes_sent: number;
    total_bytes_recv: number;
  };
}

export function NetworkStats({ data }: NetworkStatsProps) {
  const maxSpeed = 125000000; // 1 Gbps en bytes/s (pour la visualisation)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Débit sortant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                {formatBytes(data.bytes_sent_per_sec)}/s
              </span>
              <span className="text-sm text-muted-foreground">
                {formatBytes(data.total_bytes_sent)} total
              </span>
            </div>
            <Progress
              value={(data.bytes_sent_per_sec / maxSpeed) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Débit entrant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                {formatBytes(data.bytes_recv_per_sec)}/s
              </span>
              <span className="text-sm text-muted-foreground">
                {formatBytes(data.total_bytes_recv)} total
              </span>
            </div>
            <Progress
              value={(data.bytes_recv_per_sec / maxSpeed) * 100}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
