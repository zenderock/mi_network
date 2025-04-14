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
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginResponse = await login(email, password);
      localStorage.setItem("authToken", loginResponse.access_token);
      window.location.href = "/monitoring";
    } catch (err) {
      setError("Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#22002d]/10 to-purple-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <nav className="flex items-center justify-center flex-col">
            <Image src="/logo.png" alt="Logo" width={130} height={130} />
            <CardTitle className="text-2xl font-bold text-center">
              Connexion
            </CardTitle>
          </nav>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </CardFooter>
          <nav className="p-6 flex flex-col text-neutral-600 text-center">
            <small>Version 1.0.0 - 2025</small>
            <small>Ce logiciel est développé par ...</small>
          </nav>
        </form>
      </Card>
    </div>
  );
}
