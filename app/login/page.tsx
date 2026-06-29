"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  async function handleLogin() {
    try {
      await signInWithGoogle();
      // The useEffect above will redirect once Firebase updates the auth state.
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-3xl border bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-muted-foreground">
          Sign in to continue to DeadlineOS
        </p>

        <Button
          onClick={handleLogin}
          className="mt-8 w-full"
          size="lg"
        >
          <FcGoogle className="mr-3 h-5 w-5" />
          Continue with Google
        </Button>
      </div>
    </main>
  );
}