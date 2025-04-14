import { fetchApi } from "@/lib/api";

interface NetworkUsage {
  bytes_sent_per_sec: number;
  bytes_recv_per_sec: number;
  total_bytes_sent: number;
  total_bytes_recv: number;
}

interface Connection {
  local_address: string;
  remote_address: string;
  status: string;
  pid?: number;
}

export const getNetworkUsage = async (): Promise<NetworkUsage> => {
  return await fetchApi("/api/monitoring/network");
};

export const getActiveConnections = async (): Promise<Connection[]> => {
  return await fetchApi("/api/monitoring/connections");
};

export const getSystemStats = async () => {
  return await fetchApi("/api/monitoring/system");
};