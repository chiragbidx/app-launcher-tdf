"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  type AuthActionState,
  signInWithPassword,
  signUpWithPassword,
} from "./actions";

// Branding/copy constants for LeadNest
const LEADNEST_COPY = {
  signin: {
    heading: "Sign in to LeadNest",
    subheading: "Welcome back! Manage your leads and deals.",
    button: "Sign In",
    helper: "Don't have a LeadNest account? Sign up",
    forgot: "Forgot password?",
    back: "Return to LeadNest",
  },
  signup: {
    heading: "Create your LeadNest account",
    subheading: "Get started with smarter contact management.",
    button: "Sign Up",
    helper: "Already have a LeadNest account? Sign in",
  },
};

type AuthMode = "signin" | "signup";

type ClientProps = {
  redirectTo: string;
  flashStatus: "success" | "error" | null;
  flashMessage: string | null;
};

const initialActionState: AuthActionState = {
  status: "idle",
  message: "",
};

export default function Client({ redirectTo, flashStatus, flashMessage }: ClientProps) {
  const [mode, setMode] = useState<AuthMode>("signin");

  const [signInState, signInAction, signInPending] = useActionState(
    signInWithPassword,
    initialActionState
  );
  const [signUpState, signUpAction, signUpPending] = useActionState(
    signUpWithPassword,
    initialActionState
  );

  const activeState = mode === "signin" ? signInState : signUpState;
  const isPending = mode === "signin" ? signInPending : signUpPending;

  useEffect(() => {
    if (activeState._devUrl) {
      console.log(`[Dev] Auth link → ${activeState._devUrl}`);
    }
  }, [activeState._devUrl]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      setMode(hash === "signup" ? "signup" : "signin");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const setModeWithHash = (nextMode: AuthMode) => {
    setMode(nextMode);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${nextMode}`);
    }
  };

  const content = useMemo(() => {
    if (mode === "signup") {
      return {
        id: "signup",
        title: LEADNEST_COPY.signup.heading,
        description: LEADNEST_COPY.signup.subheading,
        button: LEADNEST_COPY.signup.button,
        helper: (
          <p className="text-sm text-muted-foreground text-center">
            {LEADNEST_COPY.signup.helper}{" "}
            <button
              type="button"
              onClick={() => setModeWithHash("signin")}
              className="underline hover:text-primary ml-1"
            >
              Sign in
            </button>
          </p>
        ),
      };
    }

    return {
      id: "signin",
      title: LEADNEST_COPY.signin.heading,
      description: LEADNEST_COPY.signin.subheading,
      button: LEADNEST_COPY.signin.button,
      helper: (
        <p className="text-sm text-muted-foreground text-center">
          {LEADNEST_COPY.signin.helper}{" "}
          <button
            type="button"
            onClick={() => setModeWithHash("signup")}
            className="underline hover:text-primary ml-1"
          >
            Sign up
          </button>
        </p>
      ),
    };
  }, [mode, setModeWithHash]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.45))] px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-secondary bg-card/60 shadow-2xl backdrop-blur-sm lg:grid-cols-2">
        <aside className="relative hidden min-h-[720px] p-10 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-primary/10" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                LeadNest Access
              </p>
              <h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-tight">
                Grow smarter with one CRM home for your team.
              </h1>
              <p className="max-w-md text-sm text-muted-foreground">
                Secure sign-in, polished interface, and a frictionless onboarding flow ready for your sales success.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-secondary/70 bg-background/80 p-3 shadow-lg">
              <Image
                src="/demo-img.jpg"
                alt="LeadNest product preview"
                className="h-full w-full rounded-xl object-cover"
                width={1200}
                height={900}
              />
            </div>
          </div>
        </aside>

        <div className="flex min-h-[720px] items-center justify-center p-4 sm:p-8 lg:p-10">
          <Card id={content.id} className="w-full max-w-md border-secondary/70 shadow-xl">
            <CardHeader className="space-y-4">
              <div className="grid grid-cols-2 rounded-lg border border-secondary bg-muted/40 p-1">
                <button
                  type="button"
                  onClick={() => setModeWithHash("signin")}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    mode === "signin"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setModeWithHash("signup")}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    mode === "signup"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="space-y-1">
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {flashStatus && flashMessage ? (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    flashStatus === "success"
                      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
                      : "border-destructive/20 bg-destructive/5 text-destructive"
                  }`}
                >
                  {flashMessage}
                </div>
              ) : null}

              {mode === "signin" ? (
                <form className="space-y-4" action={signInAction}>
                  {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
                        {LEADNEST_COPY.signin.forgot}
                      </Link>
                    </div>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing in..." : content.button}
                  </Button>
                </form>
              ) : (
                <form className="space-y-4" action={signUpAction}>
                  {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="signup-first-name">First name</Label>
                      <Input id="signup-first-name" name="firstName" placeholder="Chirag" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-last-name">Last name</Label>
                      <Input id="signup-last-name" name="lastName" placeholder="Dodiya" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm password</Label>
                      <Input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Repeat password"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Creating account..." : content.button}
                  </Button>
                </form>
              )}

              {activeState.status === "success" && activeState.message ? (
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400" role="status">
                  {activeState.message}
                </p>
              ) : null}

              {activeState.status === "error" && activeState.message ? (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {activeState.message}
                </p>
              ) : null}
              <div className="pt-2">{content.helper}</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}