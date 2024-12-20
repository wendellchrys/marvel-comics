import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        const loginUrl = url;
        const email = identifier;

        try {
          await resend.emails.send({
            from: "Seu Nome <no-reply@seu-dominio.com>",
            to: email,
            subject: "Seu link de login",
            html: `<p>Olá,</p>
                   <p>Clique no link abaixo para acessar sua conta:</p>
                   <a href="${loginUrl}">Entrar</a>
                   <p>Se você não solicitou este email, ignore-o.</p>`,
          });
        } catch (error) {
          console.error("Erro ao enviar email:", error);
          throw new Error("Falha ao enviar o link de login.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
