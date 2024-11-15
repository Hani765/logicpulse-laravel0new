import { UserCreateUpdateSkeleton } from "@/components/skeletons/userCreateUpdateSkeleton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/ui/image-uploader";
import Form from "../create/Form";

export default function Index({
    auth,
    user,
    offer_unique_ids,
}: PageProps<{ user: User; offer_unique_ids: any }>) {
    const { data, setData, put, errors, processing } = useForm({
        username: user.username,
        email: user.email,
        password: "",
        profile_image: user.profile_image,
        domain_id: user.domain_id,
        rate: user.rate,
        phone: user.phone,
        skype: user.skype,
        details: user.details,
        offer_ids: offer_unique_ids,
        notification: user.notification,
        role: user.role,
        isVerified: user.isVerified,
        status: user.status,
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
        put(`/dashboard/users/${user.unique_id}`, {
            onSuccess: () => {
                toast.success("User updated successfully");
            },
        });
    };
    return (
        <Authenticated user={auth.user}>
            <Head title={`Update ${user.id} - ${data.username}`}>
                <meta name="description" content={data.details} />
            </Head>
            <h2 className="text-lg">
                {user.id} - {data.username}
            </h2>
            <p className="text-sm text-gray-500 hidden sm:block py-1">
                {data.details}
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
                                onUpload={(path: string) =>
                                    setData({ ...data, profile_image: path })
                                }
                                selected_image={data.profile_image}
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
                                update={false}
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
                                    label="Update"
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
