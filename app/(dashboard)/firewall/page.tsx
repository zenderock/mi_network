/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  getFirewallRules,
  addFirewallRule,
  deleteFirewallRule,
} from "@/lib/api/firewall";
import { FirewallRulesTable } from "@/components/firewall/FirewallRulesTable";
import { AddRuleModal } from "@/components/firewall/AddRuleModal";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FirewallPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const data = await getFirewallRules();
      setRules(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleAddRule = async (rule: any) => {
    try {
      await addFirewallRule(rule);
      await fetchRules();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    try {
      await deleteFirewallRule(ruleId);
      await fetchRules();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion du Pare-feu</CardTitle>
            <Button onClick={() => setIsModalOpen(true)}>
              Ajouter une règle
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : (
            <FirewallRulesTable
              rules={rules as any}
              onDelete={handleDeleteRule}
            />
          )}
        </CardContent>
      </Card>

      <AddRuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRule}
      />
    </div>
  );
}
