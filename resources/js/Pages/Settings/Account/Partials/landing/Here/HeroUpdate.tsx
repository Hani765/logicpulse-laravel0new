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
import { Form } from "./form";

export default function HeroUpdate() {
    const { data, isLoading, error } = useFetch("/landing/hero");

    if (isLoading) {
        return <Skeleton className="w-[150px] h-[150px]" />;
    }

    return (
        <Card>
            <CardContent className="w-[150px] h-[150px] flex justify-center items-center">
                <Credenza>
                    <CredenzaTrigger>
                        <Button variant="outline" className="mt-4">
                            Hero
                        </Button>
                    </CredenzaTrigger>
                    <CredenzaContent>
                        <CredenzaHeader>
                            <CredenzaTitle>Update Hero Section</CredenzaTitle>
                            <CredenzaDescription>
                                Update the content of hero section from here!
                            </CredenzaDescription>
                        </CredenzaHeader>

                        <Form heroData={data} />
                    </CredenzaContent>
                </Credenza>
            </CardContent>
        </Card>
    );
}
