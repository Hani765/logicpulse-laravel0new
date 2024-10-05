import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";
import React, { FormEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { FaPhone } from "react-icons/fa6";
import { Globe, UserCheck2Icon, UserCircle } from "lucide-react";
import { MdEmail, MdWhatsapp } from "react-icons/md";
import { PiCityBold, PiMarkerCircle, PiSkypeLogo } from "react-icons/pi";
import { HeightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { FaCalendarTimes, FaFemale } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Transition } from "@headlessui/react";
import { AiFillProfile } from "react-icons/ai";
import InputError from "@/components/InputError";
import SubmitBtn from "@/components/ui/SubmitBtn";

export default function ProfileUpdate({
    user,
    mustVerifyEmail,
    status,
}: {
    user: User;
    mustVerifyEmail: any;
    status?: string;
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            skype: user.skype,
            whats_app: user.whats_app,
            details: user.details,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };
    return (
        <Card className="col-span-2">
            <form onSubmit={submit}>
                <CardHeader>
                    <CardTitle>
                        Profile Information
                        <CardDescription>
                            Update your account's profile information
                        </CardDescription>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label>First Name:</Label>
                                    <Input
                                        type="text"
                                        value={data.first_name}
                                        placeholder="eg: John"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                first_name: e.target.value,
                                            })
                                        }
                                        autoFocus
                                    />
                                    <InputError message={errors.first_name} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label>Last Name:</Label>
                                    <Input
                                        type="text"
                                        value={data.last_name}
                                        placeholder="eg: Doe"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                last_name: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError message={errors.last_name} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <UserCircle
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Username:
                                    </Label>
                                    <Input
                                        type="text"
                                        value={data.username}
                                        placeholder="eg: john doe"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError message={errors.username} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <MdEmail
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Email:
                                    </Label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        placeholder="example@domain.com"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <FaPhone
                                            size={12}
                                            className="text-gray-400"
                                        />
                                        Phone:
                                    </Label>
                                    <Input
                                        type="number"
                                        value={data.phone}
                                        placeholder="+123456789"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <PiSkypeLogo
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Skype:
                                    </Label>
                                    <Input
                                        type="number"
                                        value={data.skype}
                                        placeholder="+123456789"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                skype: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError message={errors.skype} />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <MdWhatsapp
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Whats app:
                                    </Label>
                                    <Input
                                        type="number"
                                        value={data.whats_app}
                                        placeholder="+123456789"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                whats_app: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError message={errors.whats_app} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold">
                                Additional Information
                            </h2>
                            <CardDescription>
                                Update your Additional information! Some
                                Information is not be editable.
                            </CardDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <Globe
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Country:
                                    </Label>
                                    <Input
                                        type="text"
                                        value={user.country}
                                        placeholder="eg: Pakistan"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <PiMarkerCircle
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Province:
                                    </Label>
                                    <Input
                                        type="text"
                                        value={user.province}
                                        placeholder="eg: Punjab"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <PiCityBold
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        City:
                                    </Label>
                                    <Input
                                        type="text"
                                        value={user.city}
                                        placeholder="eg: Lahore"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <HeightIcon className="text-gray-400" />
                                        Age:
                                    </Label>
                                    <Input
                                        type="number"
                                        value={user.age}
                                        placeholder="18+"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <FaFemale className="text-gray-400" />
                                        Gender:
                                    </Label>
                                    <Input
                                        type="text"
                                        value={user.gender}
                                        placeholder="eg: male"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <FaCalendarTimes
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Date of Birth:
                                    </Label>
                                    <Input
                                        disabled
                                        type="date"
                                        value={user.dob}
                                        placeholder="Date of birth"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="space-y-1">
                                    <Label className="flex gap-1 items-center">
                                        <UserCheck2Icon
                                            size={15}
                                            className="text-gray-400"
                                        />
                                        Current Role:
                                    </Label>
                                    <Input
                                        type="text"
                                        value={user.role}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label className="flex gap-1 items-center">
                                <AiFillProfile
                                    size={15}
                                    className="text-gray-400"
                                />
                                About yourself:
                            </Label>
                            <Textarea
                                placeholder="Something about yourself...."
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        details: e.target.value,
                                    })
                                }
                                value={data.details}
                            >
                                {user.details}
                            </Textarea>
                            <InputError message={errors.details} />
                        </div>
                    </div>
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-primary hover:text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ml-1"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
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
                    <SubmitBtn label="Submit" processing={processing} />
                </CardFooter>
            </form>
        </Card>
    );
}
