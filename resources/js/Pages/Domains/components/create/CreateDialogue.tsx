import { Button } from "@/components/ui/button";
import Form from "./Form";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { PlusIcon } from "lucide-react";

export default function Create() {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    Add New Offers
                </Button>
            </CredenzaTrigger>
            <CredenzaContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e: any) => e.preventDefault()}
            >
                <CredenzaHeader>
                    <CredenzaTitle>Add Domain</CredenzaTitle>
                    <CredenzaDescription>
                        Add a new domain to access offers via custom domain.
                    </CredenzaDescription>
                </CredenzaHeader>
                <Form />
            </CredenzaContent>
        </Credenza>
    );
}
