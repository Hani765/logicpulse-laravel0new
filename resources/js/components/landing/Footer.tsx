import { Link } from "@inertiajs/react";

export const Footer = () => {
    return (
        <footer id="footer" className="bg-gray-100 dark:bg-gray-900">
            <hr className="w-11/12 mx-auto border-t-2 border-gray-300 dark:border-gray-700 my-8" />

            <section className="container py-8 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
                <div className="col-span-full xl:col-span-2">
                    <Link
                        href="/"
                        className="font-bold text-xl flex items-center space-x-2"
                    >
                        <img
                            height={40}
                            width={40}
                            src="/assets/flogicpulse256.png"
                            alt="logo"
                            className="rounded-full"
                        />
                        <span>L o G i c P u l s e™</span>
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Follow Us</h3>
                    <div>
                        <a
                            href="https://www.linkedin.com/company/logicpulse1"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.facebook.com/logicpulseaffiliates"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Twitter
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Platforms</h3>
                    <div>
                        <a
                            href="#"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Mobile
                        </a>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Desktop
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">About</h3>
                    <div>
                        <a
                            href="#howItWorks"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Features
                        </a>
                    </div>
                    <div>
                        <a
                            href="#faq"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            FAQ
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Community</h3>
                    <div>
                        <a
                            href="#"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            YouTube
                        </a>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="text-gray-800 dark:text-white opacity-60 hover:opacity-100 transition-opacity"
                        >
                            Discord
                        </a>
                    </div>
                </div>
            </section>

            <section className="container py-4 text-center">
                <h3 className="text-gray-600 dark:text-white text-sm">
                    &copy; 2024 Website Developed by{" "}
                    <a
                        href="https://logicpulse.offer18.com"
                        className="text-primary transition-all border-b-2 border-transparent hover:border-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        L o G i c P u l s e™
                    </a>
                </h3>
            </section>
        </footer>
    );
};
