import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import Form from "./Form";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Create() {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit "
                >
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    Add New Tracker
                </Button>
            </CredenzaTrigger>
            <CredenzaContent onInteractOutside={(e: any) => e.preventDefault()}>
                <CredenzaHeader>
                    <CredenzaTitle>Add Tracker</CredenzaTitle>
                    <CredenzaDescription>
                        Manage and monitor your affiliate marketing campaigns
                        effectively by adding a new tracker.
                    </CredenzaDescription>
                </CredenzaHeader>
                <Form />
            </CredenzaContent>
        </Credenza>
    );
}
