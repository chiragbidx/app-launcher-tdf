"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OverviewClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>LeadNest Overview</CardTitle>
        <CardDescription>
          See the big picture of your sales pipeline and team activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add future dashboard graphs/stats here */}
      </CardContent>
    </Card>
  );
}