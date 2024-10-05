"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input, InputProps } from "../ui/input";
import { PiEyeClosed, PiEyeLight } from "react-icons/pi";
import { Label } from "../ui/label";

// Extend InputProps to include additional props such as className, label, and errorMessage
interface PasswordInputProps extends InputProps {
    className?: string;
    label?: string;
    errorMessage?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, label, errorMessage, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="space-y-1">
                <Label>{label}</Label>
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        className={cn("hide-password-toggle", className)}
                        ref={ref}
                        {...props}
                        placeholder="********"
                    />
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <PiEyeLight /> : <PiEyeClosed />}
                    </div>
                </div>
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        );
    }
);

// Set display name for debugging purposes
PasswordInput.displayName = "PasswordInput";
