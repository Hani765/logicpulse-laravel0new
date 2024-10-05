import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { MdMailLock } from "react-icons/md";
import { Button } from "../ui/button";
export default function SocialLogin() {
    return (
        <>
            <Button
                variant="ringHover"
                size="icon"
                className="rounded-full bg-gray-100 shadow-md transition-all duration-300 hover:bg-gray-200 hover:ring-gray-200"
            >
                <a
                    href={route("auth.google")}
                    className="flex items-center justify-center w-full h-full"
                >
                    <FcGoogle />
                </a>
            </Button>
            <Button
                variant="ringHover"
                size="icon"
                className="rounded-full bg-gray-100 shadow-md hover:transition-all text-black duration-300 hover:bg-gray-200 hover:ring-gray-200"
            >
                <a
                    href={route("auth.github")}
                    className="flex items-center justify-center w-full h-full"
                >
                    <FaGithub />
                </a>
            </Button>
            <Button
                variant="ringHover"
                size="icon"
                className="rounded-full bg-gray-100 shadow-md hover:transition-all text-black duration-300 hover:bg-gray-200 hover:ring-gray-200"
            >
                <MdMailLock />
            </Button>
        </>
    );
}
