"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginData } from "@/types/auth";
import { loginAction } from "@/actions/auth";
import { useState, useTransition } from "react";
import Link from "next/link";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginData) => {
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.remember) formData.append("remember", "on");

      const result = await loginAction(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        await refreshUser();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      {error && (
        <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg animate-in zoom-in-95 duration-200">
          {error}
        </div>
      )}

      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="nom@exemple.com"
          disabled={isPending}
          aria-invalid={!!errors.email}
          className="transition-all duration-200 focus-visible:ring-blue-500/20"
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.password}>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          <Link
            href="/auth/forgot-password"
            className="text-xs text-primary hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <Input
          {...register("password")}
          id="password"
          type="password"
          disabled={isPending}
          aria-invalid={!!errors.password}
          className="transition-all duration-200 focus-visible:ring-blue-500/20"
        />
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Field>

      <Field>
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="remember"
            checked={watch("remember")}
            onCheckedChange={(checked) =>
              setValue("remember", checked === true)
            }
            disabled={isPending}
          />
          <FieldLabel
            htmlFor="remember"
            className="text-sm font-normal cursor-pointer select-none"
          >
            Se souvenir de moi
          </FieldLabel>
        </div>
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full transition-all active:scale-[0.98]"
      >
        {isPending ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
}
