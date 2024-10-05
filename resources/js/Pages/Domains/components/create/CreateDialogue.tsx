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

export default function Create() {
    return (
        <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm flex justify-between items-center p-2 rounded">
            <h3 className="font-semibold">Domains</h3>
            <Credenza>
                <CredenzaTrigger asChild>
                    <Button variant="gooeyRight">Create new</Button>
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
        </div>
    );
}
