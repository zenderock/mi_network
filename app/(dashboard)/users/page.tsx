/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getUsers, createUser, deleteUser } from "@/lib/api/users";
import { UsersTable } from "@/components/users/UsersTable";
import { UserFormModal } from "@/components/users/UserFormModal";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: any) => {
    try {
      await createUser(userData);
      await fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des Utilisateurs</CardTitle>
            <Button onClick={() => setIsModalOpen(true)}>
              Créer un utilisateur
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Chargement...</div>
          ) : (
            <UsersTable users={users} onDelete={handleDeleteUser} />
          )}
        </CardContent>
      </Card>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
}
