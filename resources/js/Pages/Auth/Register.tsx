import React, { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import LoginLayoutComponent from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { PasswordInput } from "@/components/auth/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SubmitBtn from "@/components/ui/SubmitBtn";
import InputError from "@/components/InputError";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <LoginLayoutComponent
            heading="Join Logic Pulse for Advanced Affiliate Marketing Solutions!"
            description="Sign up with Logic Pulse and unlock powerful tools to enhance your
            affiliate marketing strategies. Gain access to robust analytics,
            comprehensive reports, and boost your website traffic effectively.
            Join us now and revolutionize your marketing efforts!"
            social={true}
            socialText="or signup using"
        >
            <Head title="Register" />
            <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
                <div className="">
                    <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                        Welcome to Freelancing Network!
                    </h2>
                    <span className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                        Sign up now to connect with clients and grow your
                        freelancing career. or?
                        <Button variant="linkHover2" className="m-0 p-0">
                            <Link href="login" className="text-primary">
                                {" "}
                                Login now
                            </Link>
                        </Button>
                    </span>
                </div>
                <div className="my-4 w-full">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <LabelInputContainer
                                type="text"
                                id="first_name"
                                helperText="eg: John"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                                errorMessage={errors.first_name}
                                autoFocus
                                label="First Name"
                            />
                            <LabelInputContainer
                                type="text"
                                id="last_name"
                                helperText="eg: Smith"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                                errorMessage={errors.last_name}
                                autoFocus
                                label="Last Name"
                            />
                            <LabelInputContainer
                                type="text"
                                id="username"
                                helperText="eg: johnsmith"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                required
                                errorMessage={errors.username}
                                autoFocus
                                label="Username"
                            />
                            <LabelInputContainer
                                type="email"
                                id="email"
                                helperText="example@domain.com"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                errorMessage={errors.email}
                                autoFocus
                                label="Email"
                            />
                        </div>
                        <div className="mt-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="items-top mb-1 flex space-x-2 mt-2">
                            <Checkbox id="terms1" required />
                            <div className="grid gap-1 leading-none">
                                <label
                                    htmlFor="terms1"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept terms and conditions
                                </label>
                                <p className="text-sm text-muted-foreground">
                                    You agree to our Terms of Service and
                                    Privacy Policy.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <SubmitBtn
                                label="Create new account"
                                processing={processing}
                                className="w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </LoginLayoutComponent>
    );
}
