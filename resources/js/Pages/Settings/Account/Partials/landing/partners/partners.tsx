import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import useFetch from "@/hooks/usefetch";
import { Skeleton } from "@/components/ui/skeleton";
import Form from "./Form";

export default function PartnersUpdate() {
    const { data, isLoading, error } = useFetch("/landing/partners  ");

    if (isLoading) {
        return <Skeleton className="w-[150px] h-[150px]" />;
    }

    return (
        <Card>
            <CardContent className="w-[150px] h-[150px] flex justify-center items-center">
                <Credenza>
                    <CredenzaTrigger>
                        <Button variant="outline" className="mt-4">
                            Partners
                        </Button>
                    </CredenzaTrigger>
                    <CredenzaContent className="h-[80%] overflow-y-auto">
                        <CredenzaHeader>
                            <CredenzaTitle>
                                Update Partners Section
                            </CredenzaTitle>
                            <CredenzaDescription>
                                Update the content of partners section from
                                here!
                            </CredenzaDescription>
                        </CredenzaHeader>
                        <Form partnersData={data} />
                    </CredenzaContent>
                </Credenza>
            </CardContent>
        </Card>
    );
}
