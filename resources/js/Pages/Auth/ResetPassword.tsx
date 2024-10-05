import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import LoginLayoutComponent from "@/Layouts/GuestLayout";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { PasswordInput } from "@/components/auth/password-input";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <LoginLayoutComponent
            heading="Login to Elevate Your Affiliate Marketing Game!"
            description="Welcome to Logic Pulse, the ultimate affiliate marketing
            platform. Access powerful tools to drive traffic, gain in-depth
            analytics, and receive comprehensive reports. Join us and
            transform your marketing strategies today!"
        >
            <Head title="Reset Password" />

            <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                        Forgot your password.
                    </h2>
                    <span className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </span>
                </div>
                <form onSubmit={submit} className="w-full">
                    <div>
                        <LabelInputContainer
                            id="email"
                            type="email"
                            value={data.email}
                            label="Email"
                            onChange={(e) => setData("email", e.target.value)}
                            errorMessage={errors.email}
                            helperText="example@domain.com"
                        />
                    </div>

                    <div className="mt-4 w-full">
                        <Label htmlFor="password">Passord</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            autoFocus
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="********"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>
                        <PasswordInput
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="********"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <SubmitBtn
                            label="Reset Password"
                            className="w-full"
                            processing={processing}
                        />
                    </div>
                </form>
            </div>
        </LoginLayoutComponent>
    );
}
