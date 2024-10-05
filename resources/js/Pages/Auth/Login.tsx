import React, { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Button } from "@/components/ui/button";
import LoginLayoutComponent from "@/Layouts/GuestLayout";
import { PasswordInput } from "@/components/auth/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SubmitBtn from "@/components/ui/SubmitBtn";
import InputError from "@/components/InputError";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <LoginLayoutComponent
            heading="Login to Elevate Your Affiliate Marketing Game!"
            description="Welcome to Logic Pulse, the ultimate affiliate marketing
                platform. Access powerful tools to drive traffic, gain in-depth
                analytics, and receive comprehensive reports. Join us and
                transform your marketing strategies today!"
            social={true}
            socialText="or signin using"
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
                <div className="">
                    <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                        Welcome back to Logic Pulse!
                    </h2>
                    <span className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                        Login to Logic Pulse to elevate your affiliate marketing
                        strategies, access in-depth analytics, and drive more
                        traffic. Need an account?{" "}
                        <Button variant="linkHover2" className="m-0 p-0">
                            <Link
                                href={route("register")}
                                className="text-primary"
                            >
                                Create one now
                            </Link>
                        </Button>
                    </span>
                </div>
                <form onSubmit={submit} className="space-y-2">
                    <LabelInputContainer
                        id="email"
                        label="Email"
                        type="email"
                        helperText="example@domain.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        errorMessage={errors.email}
                        autoFocus
                    />

                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                    <div className="flex items-center justify-between my-4">
                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox name="remember" />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                    <SubmitBtn
                        label="Sign in to your account"
                        variant="gooeyRight"
                        className="w-full"
                        processing={processing}
                    />
                </form>
            </div>
        </LoginLayoutComponent>
    );
}
