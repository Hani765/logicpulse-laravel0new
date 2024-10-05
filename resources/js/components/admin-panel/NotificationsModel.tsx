import { FaBell, FaEye } from "react-icons/fa6";
import { Card } from "../ui/card";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";

export default function NotificationsModel() {
    const [open, setOpen] = useState<boolean>(false);
    const cardRef: MutableRefObject<HTMLDivElement | null> =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cardRef]);

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)}>
                <FaBell />
            </button>
            <Transition
                show={open}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Card className="z-50 w-[350px] my-4 overflow-hidden text-base list-none divide-y divide-gray-100 rounded-lg shadow-lg dark:divide-gray-600 absolute top-0 right-4">
                    <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        Notifications
                    </div>
                    <div>
                        <Link
                            href="#"
                            className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                        >
                            <div className="flex-shrink-0">
                                <img
                                    className="rounded-full w-11 h-11"
                                    src="/assets/TkKgmreXed9Uy52D1Uf81HqIKZ6rhohpymZSALdr.jpg"
                                    alt="Jese image"
                                />
                                <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 dark:border-gray-700">
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full pl-3">
                                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                    New message from{" "}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        Bonnie Green
                                    </span>
                                    : "Hey, what's up? All set for the
                                    presentation?"
                                </div>
                                <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                                    a few moments ago
                                </div>
                            </div>
                        </Link>
                    </div>
                    <Link
                        href="/notifications"
                        className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
                    >
                        <div className="inline-flex items-center ">
                            <FaEye className="w-5 h-5 mr-2" />
                            View all
                        </div>
                    </Link>
                </Card>
            </Transition>
        </div>
    );
}
