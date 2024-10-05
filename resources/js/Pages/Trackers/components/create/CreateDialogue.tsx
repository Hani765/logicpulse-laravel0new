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

export default function Create() {
    return (
        <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm flex justify-between items-center p-2 rounded">
            <h3 className="font-semibold">Trackers</h3>
            <Credenza>
                <CredenzaTrigger asChild>
                    <Button variant="gooeyRight">Create new</Button>
                </CredenzaTrigger>
                <CredenzaContent
                    onInteractOutside={(e: any) => e.preventDefault()}
                >
                    <CredenzaHeader>
                        <CredenzaTitle>Add Tracker</CredenzaTitle>
                        <CredenzaDescription>
                            Manage and monitor your affiliate marketing
                            campaigns effectively by adding a new tracker.
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <Form />
                </CredenzaContent>
            </Credenza>
        </div>
    );
}
