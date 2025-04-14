import { fetchApi } from "@/lib/api";

export const getSystemLogs = async (): Promise<string[]> => {
  const data = await fetchApi("/api/logs/system");
  return data.logs;
};

export const getAuthLogs = async (): Promise<string[]> => {
  const data = await fetchApi("/api/logs/auth");
  return data.logs;
};
