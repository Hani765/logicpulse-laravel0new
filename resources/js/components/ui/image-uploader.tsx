import React, { FormEventHandler, useState } from "react";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./credenza";
import { Input } from "./input";
import { Label } from "./label";
import SubmitBtn from "./SubmitBtn";
import axios from "axios";
import { Button } from "./button";
import ProfilePic from "./profile_pic";

export default function ImageUploader({
    onUpload,
    selected_image,
}: {
    onUpload: any;
    selected_image: any;
}) {
    const [image, setImage] = useState<File | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [errors, setErrors] = useState({
        profile_image: [],
    });
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("Please select an image to upload");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            setLoading(true);
            const response = await axios.post("/upload/image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setImagePath(response.data.path);
            onUpload(response.data.path);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error("An error occurred during image upload", error);
            }
        }
    };

    return (
        <Credenza>
            <CredenzaTrigger className="gap-2 flex items-center">
                <ProfilePic path={selected_image} />
                <Button variant="outline">Upload Image</Button>
            </CredenzaTrigger>
            <CredenzaContent className="overflow-x-hidden">
                <CredenzaHeader>
                    <CredenzaTitle>Upload Image</CredenzaTitle>
                    <CredenzaDescription>
                        Upload an image to see the path
                    </CredenzaDescription>
                </CredenzaHeader>
                <form className="space-y-2" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <Label>Upload Image:</Label>
                        <Input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/png,image/svg,image/jpeg,image/webp"
                        />
                    </div>
                    <SubmitBtn
                        label="Upload Image"
                        processing={loading}
                        className="w-full"
                    />
                </form>
                {imagePath && (
                    <div className="mt-4">
                        <p className="text-sm text-green-500">
                            Image uploaded successfully:
                        </p>
                        <a
                            href={imagePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary"
                        >
                            {imagePath}
                        </a>
                    </div>
                )}
            </CredenzaContent>
        </Credenza>
    );
}
