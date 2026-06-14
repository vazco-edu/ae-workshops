"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Alert className="max-w-md">
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          <pre>{error.message}</pre>
        </AlertDescription>
      </Alert>
    </div>
  );
}
