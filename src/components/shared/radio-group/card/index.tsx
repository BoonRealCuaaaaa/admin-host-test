"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from '@src/shared/lib/utils/cn';

const RadioGroupCard = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid divide-y divide-separator", className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroupCard.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupCardItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
        children?: React.ReactNode;
    }
>(({ className, children, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                // "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                "flex flex-row py-5 px-[30px] items-center",
                className
            )}
            {...props}
        >
            {/* Render children here */}
            {children && <span className="flex-1 flex flex-col gap-y-2 items-start">{children}</span>}
            <div className="border border-gray-300 size-[22px] rounded-full">
                <RadioGroupPrimitive.Indicator className="">
                    <div className="size-full bg-primary-500 rounded-full flex items-center justify-center">
                        <div className="size-3 bg-white rounded-full"></div>
                    </div>
                </RadioGroupPrimitive.Indicator>
            </div>
        </RadioGroupPrimitive.Item>
    );
});

RadioGroupCardItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroupCard, RadioGroupCardItem }
