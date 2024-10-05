import { Button } from "@/components/ui/button";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { PiEyeLight } from "react-icons/pi";

export function ViewDomain({ rowCurrent }: { rowCurrent: any }) {
    const getDomain = async () => {
        const id = 1;
        try {
            const response = await fetch(`/states?country=${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };
    return (
        <Credenza>
            <CredenzaTrigger className="w-full">
                <p
                    onClick={getDomain}
                    className="w-full flex gap-4 items-center hover:bg-slate-50 justify-center py-1.5 rounded-md "
                >
                    View
                    <PiEyeLight />
                </p>
            </CredenzaTrigger>
            <CredenzaContent onInteractOutside={(e: any) => e.preventDefault()}>
                <CredenzaClose>Close</CredenzaClose>
            </CredenzaContent>
        </Credenza>
    );
}
