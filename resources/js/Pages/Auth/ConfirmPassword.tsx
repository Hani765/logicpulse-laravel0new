import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import LoginLayoutComponent from "@/Layouts/GuestLayout";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
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
        >
            <Head title="Confirm Password" />

            <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
                <div className="mb-4 text-sm text-gray-600">
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <LabelInputContainer
                            label="password"
                            id="password"
                            type="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            errorMessage={errors.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <SubmitBtn
                            label="Change Password"
                            className="w-full"
                            processing={processing}
                        />
                    </div>
                </form>
            </div>
        </LoginLayoutComponent>
    );
}
