import LoginLayoutComponent from "@/Layouts/GuestLayout";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <LoginLayoutComponent
            heading="Login to Elevate Your Affiliate Marketing Game!"
            description="Welcome to Logic Pulse, the ultimate affiliate marketing
            platform. Access powerful tools to drive traffic, gain in-depth
            analytics, and receive comprehensive reports. Join us and
            transform your marketing strategies today!"
        >
            <Head title="Forgot Password" />
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
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <form onSubmit={submit} className="space-y-2">
                    <LabelInputContainer
                        id="email"
                        type="email"
                        value={data.email}
                        autoFocus
                        onChange={(e) => setData("email", e.target.value)}
                        label="Email"
                        errorMessage={errors.email}
                        helperText="example@domain.com"
                    />
                    <SubmitBtn
                        label="Email Password Reset Link"
                        processing={processing}
                        className="w-full"
                    />
                </form>
            </div>
        </LoginLayoutComponent>
    );
}
