/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getNetworkUsage, getActiveConnections } from "@/lib/api/monitoring";
import { NetworkStats } from "@/components/monitoring/NetworkStats";
import { ConnectionsTable } from "@/components/monitoring/ConnectionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonitoringPage() {
  const [networkData, setNetworkData] = useState<any>(null);
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [usage, conns] = await Promise.all([
        getNetworkUsage(),
        getActiveConnections(),
      ]);
      setNetworkData(usage);
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
