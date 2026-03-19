"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DealsClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deals</CardTitle>
        <CardDescription>
          Your sales pipeline is empty.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Add Deal</Button>
      </CardContent>
    </Card>
  );
}