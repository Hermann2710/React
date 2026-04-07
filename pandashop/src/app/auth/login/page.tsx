import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Connexion | PandaShop",
  description:
    "Connectez-vous à votre compte PandaShop pour gérer vos produits.",
};

export default function LoginPage() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Connexion
        </h1>
        <p className="text-muted-foreground">
          Heureux de vous revoir sur PandaShop.
        </p>
      </div>

      <LoginForm />

      <div className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-primary hover:underline"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
}
