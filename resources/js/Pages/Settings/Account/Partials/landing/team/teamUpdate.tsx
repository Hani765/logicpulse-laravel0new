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

export default function HeroUpdate() {
    const { data, isLoading, error } = useFetch("/landing/teams");

    if (isLoading) {
        return <Skeleton className="w-[150px] h-[150px]" />;
    }

    return (
        <Card>
            <CardContent className="w-[150px] h-[150px] flex justify-center items-center">
                <Credenza>
                    <CredenzaTrigger>
                        <Button variant="outline" className="mt-4">
                            Teams
                        </Button>
                    </CredenzaTrigger>
                    <CredenzaContent>
                        <CredenzaHeader>
                            <CredenzaTitle>Update Team Section</CredenzaTitle>
                            <CredenzaDescription>
                                Update the content of team section from here!
                            </CredenzaDescription>
                        </CredenzaHeader>
                    </CredenzaContent>
                </Credenza>
            </CardContent>
        </Card>
    );
}
