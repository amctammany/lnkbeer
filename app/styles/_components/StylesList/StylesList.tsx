"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Style } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { AppBar, AppBarAction } from "@/components/AppBar";
import { Save } from "lucide-react";
export type StylesListProps = {
  styles: Style[];
};

const appbarItems: AppBarAction[] = [
  { text: "Save", icon: Save },
  { text: "foo" },
];

export function StylesList({ styles }: StylesListProps) {
  const form = useForm({ defaultValues: { username: "name" } });
  const onSubmit = (v) => console.log(v);
  return (
    <div className="">
      <AppBar title="Styles List" actions={appbarItems}>
        SSS
      </AppBar>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default StylesList;
