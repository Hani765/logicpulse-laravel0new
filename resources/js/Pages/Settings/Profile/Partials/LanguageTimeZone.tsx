import InputError from "@/components/InputError";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { countriesData } from "@/lib/countries";
import { User } from "@/types";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import useFetch from "@/hooks/usefetch"; // Import the useFetch hook

export default function LanguageTimeZone({ user }: { user: User }) {
    const [languageData, setLanguageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Initialize form data with user data
    const { data, setData, processing, patch, errors, recentlySuccessful } =
        useForm({
            language: user.language,
            time_zone: user.time_zone,
        });
    const fetchLanguageData = async () => {
        const response = await fetch("/fetch/languagesData");
        const data = await response.json();
        setLanguageData(data);
        setIsLoading(false);
    };
    useEffect(() => {
        // Fetch language data
        fetchLanguageData();
    }, []);
    // Flatten timezones array from countriesData
    const timezones = countriesData.reduce((acc, country) => {
        if (country.timezones) {
            acc.push(...country.timezones);
        }
        return acc;
    }, [] as { zoneName: string; tzName: string; abbreviation: string; gmtOffsetName: string }[]);

    // Form submit handler
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch("/update/timeZone", {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Language &amp; Time</CardTitle>
                <CardDescription>
                    Select Language and TimeZone for your Profile
                </CardDescription>
            </CardHeader>
            <form onSubmit={submit}>
                <CardContent className="space-y-2">
                    {!isLoading ? (
                        <>
                            <Label>Select Language</Label>
                            <Select
                                required
                                value={data.language}
                                onValueChange={(language) =>
                                    setData({ ...data, language })
                                }
                            >
                                <SelectTrigger className="h-10 my-1">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languageData?.map((language: any) => (
                                        <SelectItem
                                            key={language.name}
                                            value={language.name}
                                        >
                                            {language.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.language} />
                            <Label>Select TimeZone</Label>
                            <Select
                                required
                                value={data.time_zone}
                                onValueChange={(time_zone) =>
                                    setData({ ...data, time_zone })
                                }
                            >
                                <SelectTrigger className="h-10 my-1">
                                    <SelectValue placeholder="Select TimeZone" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timezones.map((timezone) => (
                                        <SelectItem
                                            key={timezone.zoneName}
                                            value={timezone.zoneName}
                                        >
                                            {timezone.tzName} (
                                            {timezone.abbreviation}){" "}
                                            {timezone.gmtOffsetName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.time_zone} />
                        </>
                    ) : (
                        <>
                            <Skeleton className="w-[20%] h-4" />
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-[20%] h-4" />
                            <Skeleton className="w-full h-10" />
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end items-center">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-primary">Saved.</p>
                    </Transition>
                    <SubmitBtn label="save" processing={processing} />
                </CardFooter>
            </form>
        </Card>
    );
}
