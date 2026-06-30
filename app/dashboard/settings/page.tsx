"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your DeadlineOS account.
        </p>
      </div>

      <div className="rounded-3xl border bg-card p-8">

        <h2 className="text-xl font-semibold">
          Profile
        </h2>

        <div className="mt-6 space-y-5">

          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <p className="text-lg font-medium">
              {user?.displayName || "Unknown User"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="text-lg font-medium">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

      <div className="rounded-3xl border bg-card p-8">

        <h2 className="text-xl font-semibold">
          Account
        </h2>

        <p className="mt-3 text-muted-foreground">
          Sign out of your DeadlineOS account.
        </p>

        <Button
          className="mt-6"
          variant="destructive"
          onClick={logout}
        >
          Logout
        </Button>

      </div>

    </div>
  );
}