"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Page() {
  const { data } = useSuspenseQuery(orpc.health.queryOptions());

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Alert className="max-w-xs">
        <AlertTitle>Server connection established</AlertTitle>
        <AlertDescription>
          Status: <Badge variant="secondary">{data.status}</Badge>
        </AlertDescription>
      </Alert>
    </div>
  );
}
