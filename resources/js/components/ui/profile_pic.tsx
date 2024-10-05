import { CircleUser } from "lucide-react";
export default function ProfilePic({ path }: { path: string }) {
    return (
        <div className="w-9 h-9 rounded-full border overflow-hidden flex items-center justify-center">
            {path ? (
                <img src={path} alt="logo" className="w-7 h-7 rounded-full" />
            ) : (
                <CircleUser className="h-5 w-5" />
            )}
        </div>
    );
}
