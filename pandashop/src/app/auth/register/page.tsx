import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Créer un compte | PandaShop",
  description:
    "Rejoignez PandaShop et commencez à gérer vos produits dès aujourd'hui.",
};

export default function RegisterPage() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Créer un compte
        </h1>
        <p className="text-muted-foreground">
          Rejoignez PandaShop en quelques secondes.
        </p>
      </div>

      <RegisterForm />

      <div className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-primary hover:underline"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
