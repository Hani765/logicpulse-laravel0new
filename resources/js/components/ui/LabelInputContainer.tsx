import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Input } from "./input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { FaQuestionCircle } from "react-icons/fa";
import PopoverComponent from "./popover-component";

export const LabelInputContainer = ({
    className,
    autoFocus,
    inputClassName,
    label,
    description,
    errorMessage,
    successMessage,
    bottomMessage,
    disabled,
    required,
    helperText,
    type,
    value,
    onChange,
    Icon,
    id,
    inputRef,
}: {
    className?: string;
    inputClassName?: string;
    autoFocus?: boolean;
    label?: string;
    description?: string;
    errorMessage?: string;
    bottomMessage?: string;
    successMessage?: string;
    disabled?: boolean;
    required?: boolean;
    helperText?: string;
    type: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    Icon?: React.ComponentType<any>;
    id?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
}) => {
    return (
        <div className={cn("space-y-1", className)}>
            {label && (
                <Label
                    className={`flex gap-1 items-center ${
                        errorMessage && "text-red-500"
                    }`}
                    htmlFor={id || "input"}
                >
                    {Icon && (
                        <Icon size={16} className="text-muted-foreground" />
                    )}
                    {label}
                    {description && (
                        <PopoverComponent description={description} />
                    )}
                </Label>
            )}
            <Input
                type={type}
                value={value}
                ref={inputRef}
                onChange={onChange}
                disabled={disabled}
                className={cn(inputClassName)}
                autoFocus={autoFocus}
                required={required}
                placeholder={helperText}
                id={id || "input"}
            />
            {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            {successMessage && (
                <p className="text-sm text-green-500">{successMessage}</p>
            )}
            {bottomMessage && (
                <p className="text-sm text-gray-500">{bottomMessage}</p>
            )}
        </div>
    );
};
