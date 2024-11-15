import { UserCreateUpdateSkeleton } from "@/components/skeletons/userCreateUpdateSkeleton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Form from "./Form";
import { buttonVariants } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/ui/image-uploader";

export default function Index({ auth }: PageProps) {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        email: "",
        password: "",
        profile_image: "",
        domain_id: "",
        rate: "",
        phone: "",
        skype: "",
        details: "",
        offer_ids: "",
        notification: "yes",
        role: "",
        isVerified: "no",
        status: "active",
    });
    const [fetchedData, setFetchedData] = useState({
        domains: [],
        offers: [],
    });
    const [fetching, setFetching] = useState(true);
    const role = auth.user.role;
    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                fetch("/fetch/domains"),
                fetch("/fetch/offers"),
            ]);

            const [domains, offers] = await Promise.all(
                responses.map((res) =>
                    res.ok ? res.json() : Promise.reject(res),
                ),
            );
            setFetchedData({ domains, offers });
            setFetching(false);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const updateUser = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/dashboard/users", {
            onSuccess: () => {
                toast.success("User created successfully");
            },
        });
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Create new user">
                <meta
                    name="description"
                    content="Fill out the form below to add a new user. Please
                            provide the necessary details including domain and
                            offer information to ensure the user is set up
                            correctly. Once all the fields are completed, click
                            the submit button to create the user."
                />
            </Head>
            <h2 className="text-lg">Create new user</h2>
            <p className="text-sm text-gray-500 hidden sm:block py-1">
                Fill out the form below to add a new user. Please provide the
                necessary details including domain and offer information to
                ensure the user is set up correctly.
            </p>
            <>
                {fetching ? (
                    <UserCreateUpdateSkeleton />
                ) : (
                    <>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded flex justify-between items-center">
                            <div className="">
                                <Label>Upload Image</Label>
                                <p className="text-sm">
                                    Upload and set a profile pin for user!
                                </p>
                                {data.profile_image && (
                                    <p className="text-primary text-sm">
                                        {data.profile_image}
                                    </p>
                                )}
                            </div>
                            <ImageUploader
                                selected_image={data.profile_image}
                                onUpload={(path: string) =>
                                    setData({ ...data, profile_image: path })
                                }
                            />
                        </div>
                        <form onSubmit={updateUser}>
                            <Form
                                domains={fetchedData.domains}
                                offers={fetchedData.offers}
                                role={role}
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                            <hr className="my-3" />
                            <div className="w-full items-center flex gap-2">
                                <Link
                                    href="/dashboard/users"
                                    className={`w-full ${buttonVariants({ variant: "outline" })}`}
                                >
                                    Cancel
                                </Link>
                                <SubmitBtn
                                    label="Create"
                                    className="w-full"
                                    processing={processing}
                                />
                            </div>
                        </form>
                    </>
                )}
            </>
        </Authenticated>
    );
}
