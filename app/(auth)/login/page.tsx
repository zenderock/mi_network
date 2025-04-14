/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Connexion Admin
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Mot de passe</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
