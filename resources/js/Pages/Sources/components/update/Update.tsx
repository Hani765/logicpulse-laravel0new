import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { FaPencil } from "react-icons/fa6";
import { TrackerForm } from "./TrackerForm";

export function EditDomain({ rowCurrent }: { rowCurrent: any }) {
    return (
        <Credenza>
            <CredenzaTrigger className="w-full">
                <p className="w-full flex gap-4 items-center hover:bg-slate-50 justify-center py-1.5 rounded-md">
                    Edit
                    <FaPencil size={11} />
                </p>
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Edit Domain</CredenzaTitle>
                    <CredenzaDescription>
                        <span className="text-primary mr-1">
                            {rowCurrent.id}: {rowCurrent.name}
                        </span>
                        <br />
                        Update your Tracker access and values from here. The
                        changes you make cannot be undone!
                    </CredenzaDescription>
                </CredenzaHeader>
                <TrackerForm rowCurrent={rowCurrent} />
            </CredenzaContent>
        </Credenza>
    );
}
