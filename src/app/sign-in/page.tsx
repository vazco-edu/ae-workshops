"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit({ email }: SignInFormValues) {
    setSubmitError(null);

    const { error: signInError } = await authClient.signIn.magicLink({ email, callbackURL: "/" });

    if (signInError) {
      setSubmitError(signInError.message ?? "Something went wrong");
      return;
    }

    setSent(true);
  }

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a magic link. New accounts are created automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <p className="text-muted-foreground text-sm">
              Check your email for the magic link. Click it to finish signing in.
            </p>
          ) : (
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldContent>
                          <FieldLabel>Email</FieldLabel>
                          <Input {...field} type="email" placeholder="you@example.com" />
                          <FieldError>{fieldState.error?.message || submitError}</FieldError>
                        </FieldContent>
                      </Field>
                    )}
                  />

                  <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                    {form.formState.isSubmitting ? "Sending..." : "Send magic link"}
                  </Button>
                </FieldGroup>
              </form>
            </FormProvider>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
