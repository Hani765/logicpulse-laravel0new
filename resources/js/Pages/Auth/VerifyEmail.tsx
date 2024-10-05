import SubmitBtn from "@/components/ui/SubmitBtn";
import LoginLayoutComponent from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <LoginLayoutComponent
            heading="Login to Elevate Your Affiliate Marketing Game!"
            description="Welcome to Logic Pulse, the ultimate affiliate marketing
            platform. Access powerful tools to drive traffic, gain in-depth
            analytics, and receive comprehensive reports. Join us and
            transform your marketing strategies today!"
        >
            <Head title="Email Verification" />
            <div className="mx-2 w-full rounded-none p-4 md:rounded-2xl md:p-8 lg:mx-4">
                <div className="mb-4 text-sm text-gray-600">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                {status === "verification-link-sent" && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-4 flex items-center justify-between">
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Log Out
                        </Link>
                        <SubmitBtn
                            label="Resend Verification Email"
                            processing={processing}
                        />
                    </div>
                </form>
            </div>
        </LoginLayoutComponent>
    );
}
