import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table-shadcn";
import { Textarea } from "@/components/ui/textarea";
import { FaClipboard } from "react-icons/fa6";
import { toast } from "sonner";

export default function DataTable({ responses }: { responses: any }) {
    const handleCopyToClipboard = (data: any) => {
        // Convert data to JSON string
        const textToCopy = JSON.stringify(data);

        // Use the Clipboard API to copy text
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                toast.info("Copying to clipboard was successful!");
            })
            .catch((err) => {
                toast.error("Could not copy text: ", err);
            });
    };
    return (
        <div className="rounded my-4 w-full dark:bg-gray-900 bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="whitespace-nowrap">
                        <TableHead className="border border-gray-300 px-4 py-2">
                            Hit #
                        </TableHead>
                        <TableHead className="border border-gray-300 px-4 py-2">
                            Status
                        </TableHead>
                        <TableHead className="border border-gray-300 px-4 py-2">
                            Response Data
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {responses.map((response: any, index: any) => (
                        <TableRow key={index}>
                            <TableCell className="border border-gray-300 px-4 py-2">
                                {response.hit}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 py-2">
                                {response.status === 200 ? (
                                    <span className="px-4 py-0.5 text-sm bg-green-500 rounded text-white">
                                        {response.status}
                                    </span>
                                ) : (
                                    <span className="px-4 py-0.5 text-sm bg-red-500 rounded text-white">
                                        {response.status}
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="border border-gray-300 px-4 py-2 relative">
                                <Button
                                    size="icon"
                                    className="absolute top-1 right-4 hover:bg-transparent"
                                    variant="ghost"
                                    onClick={() =>
                                        handleCopyToClipboard(response.data)
                                    }
                                >
                                    <FaClipboard />
                                </Button>
                                <Textarea className="w-full" readOnly>
                                    {JSON.stringify(response.data)}
                                </Textarea>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}