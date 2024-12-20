"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from '@src/shared/lib/utils/cn';

const RadioGroupCardSeparate = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-y-5", className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroupCardSeparate.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupCardSeparateItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
        children?: React.ReactNode;
    }
>(({ className, children, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "flex flex-row p-4 gap-x-4 rounded-xl border border-gray-200 items-center",
                className
            )}
            {...props}
        >
            <div className="border border-gray-300 size-[22px] rounded-full">
                <RadioGroupPrimitive.Indicator className="">
                    <div className="size-full bg-primary-500 rounded-full flex items-center justify-center">
                        <div className="size-3 bg-white rounded-full"></div>
                    </div>
                </RadioGroupPrimitive.Indicator>
            </div>
            {/* Render children here */}
            {children}
        </RadioGroupPrimitive.Item>
    );
});

RadioGroupCardSeparateItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroupCardSeparate, RadioGroupCardSeparateItem }
