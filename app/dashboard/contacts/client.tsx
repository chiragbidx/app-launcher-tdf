"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ContactsClient() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
        <CardDescription>
          You haven’t added any contacts yet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Add Contact</Button>
      </CardContent>
    </Card>
  );
}