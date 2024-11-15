import { CircleUser } from "lucide-react";
interface pageProps {
    path: string | null;
}
export default function ProfilePic({ path }: pageProps) {
    return (
        <div className="w-9 h-9 rounded-full border overflow-hidden flex items-center justify-center">
            {path !== null ? (
                <img src={path} alt="logo" className="w-7 h-7 rounded-full" />
            ) : (
                <CircleUser className="h-5 w-5" />
            )}
        </div>
    );
}
