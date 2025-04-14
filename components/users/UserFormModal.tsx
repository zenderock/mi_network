"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    username: string;
    email: string;
    password: string;
    is_admin: boolean;
  }) => void;
  initialData?: {
    username: string;
    email: string;
    is_admin: boolean;
  };
}

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: UserFormModalProps) {
  const [username, setUsername] = useState(initialData?.username || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(initialData?.is_admin || false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!initialData;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit({
        username,
        email,
        password,
        is_admin: isAdmin,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Modifier l'utilisateur"
              : "Créer un nouvel utilisateur"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="john_doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              {isEditMode
                ? "Nouveau mot de passe (laisser vide pour ne pas changer)"
                : "Mot de passe"}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEditMode ? "********" : "••••••••"}
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Switch id="admin" checked={isAdmin} onCheckedChange={setIsAdmin} />
            <Label htmlFor="admin">Administrateur</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading || !username || !email || (!isEditMode && !password)
            }
          >
            {isLoading ? "En cours..." : isEditMode ? "Enregistrer" : "Créer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
