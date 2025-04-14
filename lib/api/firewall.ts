import { fetchApi } from "@/lib/api";

export const getFirewallRules = async () => {
  return await fetchApi("/api/firewall/");
};

export const addFirewallRule = async (rule: {
  protocol: string;
  port: string;
  action?: string;
  source?: string;
}) => {
  return await fetchApi("/api/firewall/", {
    method: "POST",
    body: JSON.stringify(rule),
  });
};
export const deleteFirewallRule = async (ruleId: string) => {
  return await fetchApi(`/api/firewall/${ruleId}`, {
    method: "DELETE",
  })
}