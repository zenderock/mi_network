/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getNetworkUsage, getActiveConnections, getSystemStats } from "@/lib/api/monitoring";
import { NetworkStats } from "@/components/monitoring/NetworkStats";
import { ConnectionsTable } from "@/components/monitoring/ConnectionsTable";
import { SystemStats } from "@/components/monitoring/SystemStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonitoringPage() {
  const [networkData, setNetworkData] = useState<any>(null);
  const [systemStats, setSystemStats] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [usage, stats, conns] = await Promise.all([
        getNetworkUsage(),
        getSystemStats(),
        getActiveConnections(),
      ]);
      setNetworkData(usage);
      setSystemStats(stats);
      setConnections(conns);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Statistiques Réseau</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : networkData ? (
            <NetworkStats data={networkData} />
          ) : (
            <div>Erreur de chargement</div>
          )}
        </CardContent>
      </Card>

      {/* Statistiques Système */}
      <SystemStats data={systemStats || { cpu_percent: 0, memory_percent: 0, disk_usage: 0 }} />

      <Card>
        <CardHeader>
          <CardTitle>Connexions Actives</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : (
            <ConnectionsTable connections={connections} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
