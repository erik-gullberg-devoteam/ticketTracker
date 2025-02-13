"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  imageUrl?: string
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value = 0, imageUrl = "https://erikgullberg.se/frank.png", ...props }, ref) => (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-yellow-500 transition-all"
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </ProgressPrimitive.Root>
      <img
         src={imageUrl}
         alt="Progress marker"
         style={{
           position: "absolute",
           left: `calc(${value}% - 25px)`, // Adjusted to center the image (assuming 50px width)
           top: "-30px", // Adjust vertical position as needed
           width: "50px",
           height: "50px",
           zIndex: 10, // ensure it's on top
           transform: "scaleX(-1)" // mirror the image
         }}
      />
    </div>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
