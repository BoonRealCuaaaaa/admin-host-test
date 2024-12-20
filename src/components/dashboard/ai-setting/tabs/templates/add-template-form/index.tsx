"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormCounter,
  FormItem,
  FormLabel,
  FormMessage,
  FormStatus,
  FormDialogContent,
} from "@src/components/shared/form"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMainContent,
  DialogTitle,
  DialogTrigger,
} from "@src/components/shared/dialog"

import { Button } from "@src/components/shared/button";

const formSchema = z.object({
  name: z.string().max(50, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().max(100),
  template: z.string().max(2000),
})

export function AddTemplateForm({ onSubmitCallback }: { onSubmitCallback?: (data) => void }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      template: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (onSubmitCallback) onSubmitCallback(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="add-template-form" className="gap-y-5 w-full">
        <FormDialogContent>
          <DialogHeader>
            <DialogTitle>Create new Template</DialogTitle>
          </DialogHeader>
          <DialogMainContent>
            <FormField
              control={form.control}
              name="name"
              maxLength={50}
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Template name..." {...field} />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              maxLength={100}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FormInput placeholder="What is this template used for?" {...field} />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="template"
              maxLength={2000}
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Template</FormLabel>
                  <FormControl>
                    <FormInput placeholder="Write your template here..." {...field} />
                  </FormControl>
                  <FormStatus>
                    <FormMessage />
                    <FormCounter />
                  </FormStatus>
                </FormItem>
              )}
            />
          </DialogMainContent>
          <DialogFooter>
            <Button type="submit" variant="primary" size="medium" className="w-full">
              Create new Template
            </Button>
          </DialogFooter>
        </FormDialogContent>
      </form>
    </Form>
  )
}
