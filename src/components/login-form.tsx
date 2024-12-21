'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { Github, Chrome } from "lucide-react";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setErrorMessage(null);
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      setErrorMessage(`Não foi possível autenticar com ${provider}. Por favor, tente novamente.`);
    }
  };

  return (
    <div className="p-10 flex justify-center flex-col items-center">
      <Card className="overflow-hidden w-full max-w-md">
        <CardContent className="grid p-6 md:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Entre em sua conta</h1>
            <p className="text-muted-foreground">
              Escolha uma das opções abaixo para continuar.
            </p>
          </div>
          <div className="grid gap-4 mt-6">
            {errorMessage && (
              <div className="text-red-500 text-sm text-center mb-4">
                {errorMessage}
              </div>
            )}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => handleSocialLogin("google")}
            >
              <Chrome size={20} />
              Login com Google
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => handleSocialLogin("github")}
            >
              <Github size={20} />
              Login com GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
