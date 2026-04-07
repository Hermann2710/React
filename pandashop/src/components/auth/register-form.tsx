"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, type RegisterData } from "@/types/auth";
import { registerAction } from "@/actions/auth";
import { useState, useTransition } from "react";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (data: RegisterData) => {
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await registerAction(formData);

      if (result?.error) {
        setError(result.error);
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

      <div className="grid grid-cols-2 gap-4">
        <Field data-invalid={!!errors.first_name}>
          <FieldLabel htmlFor="first_name">Prénom</FieldLabel>
          <Input
            {...register("first_name")}
            id="first_name"
            placeholder="Jean"
            disabled={isPending}
            aria-invalid={!!errors.first_name}
            className="transition-all duration-200 focus-visible:ring-blue-500/20"
          />
          {errors.first_name && (
            <FieldError>{errors.first_name.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.last_name}>
          <FieldLabel htmlFor="last_name">Nom</FieldLabel>
          <Input
            {...register("last_name")}
            id="last_name"
            placeholder="Dupont"
            disabled={isPending}
            aria-invalid={!!errors.last_name}
            className="transition-all duration-200 focus-visible:ring-blue-500/20"
          />
          {errors.last_name && (
            <FieldError>{errors.last_name.message}</FieldError>
          )}
        </Field>
      </div>

      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="jean@exemple.com"
          disabled={isPending}
          aria-invalid={!!errors.email}
          className="transition-all duration-200 focus-visible:ring-blue-500/20"
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
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

      <Field data-invalid={!!errors.password_confirmation}>
        <FieldLabel htmlFor="password_confirmation">Confirmation</FieldLabel>
        <Input
          {...register("password_confirmation")}
          id="password_confirmation"
          type="password"
          disabled={isPending}
          aria-invalid={!!errors.password_confirmation}
          className="transition-all duration-200 focus-visible:ring-blue-500/20"
        />
        {errors.password_confirmation && (
          <FieldError>{errors.password_confirmation.message}</FieldError>
        )}
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full transition-all active:scale-[0.98]"
      >
        {isPending ? "Création du compte..." : "S'inscrire"}
      </Button>
    </form>
  );
}
