import { PasswordInput } from "@/components/auth/password-input";
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
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export default function PasswordUpdate() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                    Ensure your account is using a long, random password to stay
                    secure.
                </CardDescription>
            </CardHeader>
            <form onSubmit={updatePassword}>
                <CardContent className="space-y-2">
                    <div>
                        <Label>Current Passwrod:</Label>
                        <PasswordInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            autoComplete="current-password"
                        />

                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>New Passwrod:</Label>
                        <PasswordInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            autoComplete="new-password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label>Confirm Passwrod:</Label>
                        <PasswordInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            autoComplete="new-password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
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
