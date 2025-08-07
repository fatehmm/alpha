import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/confirm-email")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session.data?.user.id) {
          navigate({ to: "/projects" });
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-900/80">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Check Your Email
            </CardTitle>

            <CardDescription className="text-gray-600 dark:text-gray-400">
              We sent a verification email to your account. Please click on the
              link to verify your email address.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the email? Check your spam folder.
            </p>
          </div>

          <Button onClick={handleGoHome} variant="outline" className="w-full">
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
