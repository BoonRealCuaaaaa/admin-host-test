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
} from "@src/components/shared/form"


import { Button } from "@src/components/shared/button";

const formSchema = z.object({
    name: z.string().min(10, {
        message: "Must be at least 10 characters.",
    }),
    description: z.string().max(100),
    template: z.string().max(2000),
})

interface Props {
    onSubmit?: (data) => void;
    name?: string,
    description?: string,
    template?: string,
}

export function EditTemplateForm(props: Props) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.name ?? "",
            description: props.description ?? "",
            template: props.template ?? "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (props.onSubmit) props.onSubmit(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="edit-template-form" className="flex flex-col p-4 rounded-xl border border-gray-200 gap-y-5 w-full">
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
                <div className="flex gap-x-2.5 justify-end">
                    <Button variant="light">Cancel</Button>
                    <Button type="submit" variant="primary">Save</Button>
                </div>

            </form>
        </Form>
    )
}
