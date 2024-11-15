import { buttonVariants } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

export default function Create() {
    return (
        <Link
            className={`w-full sm:w-fit ${buttonVariants({
                variant: "outline",
            })}`}
            href={route("offers.create")}
        >
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            Add New offer
        </Link>
    );
}
