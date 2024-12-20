'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const result = await signIn("email", {
      email,
      redirect: false,
    });

    if (result?.error) {
      setMessage("Erro ao enviar o link de login. Tente novamente.");
    } else {
      setMessage("Verifique seu email para o link de login.");
    }

    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-6 md:p-8">
          <form className="flex flex-col gap-6" onSubmit={handleMagicLinkLogin}>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Marvel Comics</h1>
              <p className="text-muted-foreground">
                Insira seu email para receber o link de login ou use as opções sociais.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Link de Login"}
            </Button>
            {message && <p className="text-center text-sm">{message}</p>}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("google")}
              >
                Login com Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("github")}
              >
                Login com GitHub
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
