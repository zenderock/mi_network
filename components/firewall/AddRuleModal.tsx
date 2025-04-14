"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AddRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rule: {
    protocol: string;
    port: string;
    action: string;
    source: string;
  }) => void;
}

export function AddRuleModal({ isOpen, onClose, onSubmit }: AddRuleModalProps) {
  const [protocol, setProtocol] = useState("tcp");
  const [port, setPort] = useState("");
  const [action, setAction] = useState("ACCEPT");
  const [source, setSource] = useState("0.0.0.0/0");

  const handleSubmit = () => {
    onSubmit({ protocol, port, action, source });
    setPort("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une règle de pare-feu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="protocol" className="text-right">
              Protocole
            </Label>
            <Select value={protocol} onValueChange={setProtocol}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Protocole" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tcp">TCP</SelectItem>
                <SelectItem value="udp">UDP</SelectItem>
                <SelectItem value="icmp">ICMP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="port" className="text-right">
              Port
            </Label>
            <Input
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="col-span-3"
              placeholder="80, 443, etc."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="action" className="text-right">
              Action
            </Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACCEPT">Autoriser</SelectItem>
                <SelectItem value="DROP">Rejeter silencieusement</SelectItem>
                <SelectItem value="REJECT">
                  Rejeter avec notification
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="source" className="text-right">
              Source
            </Label>
            <Input
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="col-span-3"
              placeholder="0.0.0.0/0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Ajouter la règle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
