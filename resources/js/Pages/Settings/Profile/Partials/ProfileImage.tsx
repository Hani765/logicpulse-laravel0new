import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleUser } from "lucide-react";

export default function ProfileImage({
    profileImagePath,
}: {
    profileImagePath: string;
}) {
    return (
        <Card className="w-full">
            <CardContent className="flex items-center h-100 py-2 gap-2">
                {profileImagePath !== null ? (
                    <img
                        className="h-20  w-20 rounded-full border-2 border-primary"
                        alt="user profile"
                        src={profileImagePath}
                    />
                ) : (
                    <CircleUser className="h-20 w-20 rounded-full border-2 border-primary" />
                )}
                <CardHeader className="p-0">
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                        JPG, GIF, or PNG. Max size of 800K
                    </CardDescription>
                    <div className="flex gap-2 min-w-full flex-wrap">
                        <label
                            htmlFor="profilePicture"
                            className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 whitespace-nowrap"
                        >
                            Select Picture
                        </label>
                        <Input
                            type="file"
                            id="profilePicture"
                            name="profile_picture"
                            className="hidden"
                        />
                        <Button>Upload</Button>
                    </div>
                </CardHeader>
            </CardContent>
        </Card>
    );
}
