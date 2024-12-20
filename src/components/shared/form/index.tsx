"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from '@src/shared/lib/utils/cn';
import { Label } from "@src/components/shared/label"
import { Input } from "../input"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  maxLength?: number
  required?: boolean
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  maxLength,
  required,
  ...props
}: ControllerProps<TFieldValues, TName> & { maxLength?: number, required?: boolean }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name, maxLength, required }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState, watch } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)
  const currentValue = watch(fieldContext.name); // Watch the current value of the field
  const currentLength = currentValue?.length || 0; // Calculate the length of the value

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    currentLength, // Add currentLength to the returned object
    maxLength: fieldContext.maxLength,
    required: fieldContext.required,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("flex flex-col gap-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormItemHorizontal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("grid grid-cols-horizontal-input items-center gap-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItemHorizontal.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId, required } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "", className)}
      htmlFor={formItemId}
      {...props}
    >
      {props.children}
      {required && <span className="ml-1 text-danger">*</span>}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-xs/3 text-danger", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

const FormInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, ref) => {
  const { currentLength, maxLength, required, error } = useFormField()

  return (
    <Input
    ref={ref}
    className={cn((error && currentLength > 0) ? 'border-danger': '', className)}
    {...props}
    maxLength={maxLength}
    required={required}
    />
  )
})
FormInput.displayName = "FormInput"

const FormCounter = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { currentLength, maxLength } = useFormField()

  return (
    <p
      ref={ref}
      className={cn("text-xs/3 text-gray-700 flex-1 text-end", className)}
      {...props}
    >
      {currentLength} / {maxLength}
    </p>
  )
})
FormCounter.displayName = "FormCounter"

const FormStatus = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between", className)}
    {...props}
  />
))
FormStatus.displayName = "FormStatus"

const FormDialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("divide-y divide-separator gap-x-5 w-full", className)}
    {...props}
  />
))
FormDialogContent.displayName = "FormDialogContent"

export {
  useFormField,
  Form,
  FormItem,
  FormItemHorizontal,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormCounter,
  FormInput,
  FormStatus,
  FormDialogContent
}
