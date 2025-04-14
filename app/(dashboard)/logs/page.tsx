/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getSystemLogs, getAuthLogs } from "@/lib/api/logs";
import { Alert } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LogsPage() {
  const [tab, setTab] = useState<"system" | "auth">("system");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchLogs = async () => {
      try {
        const data =
          tab === "system" ? await getSystemLogs() : await getAuthLogs();
        setLogs(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération des logs");
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [tab]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Logs système & authentification</CardTitle>
            <div className="space-x-2">
              <Button
                variant={tab === "system" ? "default" : "outline"}
                onClick={() => setTab("system")}
              >
                Système
              </Button>
              <Button
                variant={tab === "auth" ? "default" : "outline"}
                onClick={() => setTab("auth")}
              >
                Auth
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <Alert type="error" message={error} />}
          {loading ? (
            <div>Chargement...</div>
          ) : (
            <pre className="bg-black text-white rounded p-4 overflow-x-auto text-xs max-h-[600px]">
              {logs.length > 0 ? logs.join("\n") : "Aucun log à afficher."}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
