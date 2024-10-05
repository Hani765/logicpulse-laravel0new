import { FormEventHandler, useRef } from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import InputError from "@/components/InputError";
import { PasswordInput } from "@/components/auth/password-input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <Credenza>
                    <CredenzaTrigger className="bg-red-500 hover:bg-red-600 p-2 rounded text-white font-semibold">
                        Delete Account
                    </CredenzaTrigger>
                    <CredenzaContent
                        onInteractOutside={(e: any) => e.preventDefault()}
                    >
                        <CredenzaHeader>
                            <CredenzaTitle>
                                Are you sure you want to delete your account?
                            </CredenzaTitle>
                            <CredenzaDescription>
                                Once your account is deleted, all of its
                                resources and data will be permanently deleted.
                                Please enter your password to confirm you would
                                like to permanently delete your account.
                            </CredenzaDescription>
                        </CredenzaHeader>
                        <form onSubmit={deleteUser}>
                            <Label htmlFor="password">Password:</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoFocus
                                placeholder="Password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                            <CredenzaFooter className="flex justify-end mt-2">
                                <CredenzaClose>Cancel</CredenzaClose>
                                <SubmitBtn
                                    label="Delete Account"
                                    processing={processing}
                                    variant="destructive"
                                />
                            </CredenzaFooter>
                        </form>
                    </CredenzaContent>
                </Credenza>
            </CardFooter>
        </Card>
    );
}
