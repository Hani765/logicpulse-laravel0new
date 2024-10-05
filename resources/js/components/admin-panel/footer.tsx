import { FaGithub, FaInstagram, FaSkype, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

const FooterLink = ({ href, children }: { href: string; children: any }) => (
    <li>
        <a
            href={href}
            className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
        >
            {children}
        </a>
    </li>
);

const SocialIcon = ({ href, Icon }: { href: string; Icon: any }) => (
    <a
        href={href}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    >
        <Icon size={16} />
    </a>
);

export function Footer() {
    return (
        <div>
            <footer className="p-4 my-6 mx-4 bg-white rounded shadow md:flex md:items-center md:justify-between dark:bg-gray-800">
                <ul className="flex flex-wrap items-center mb-6 space-y-1 md:mb-0">
                    <FooterLink href="#">Terms and conditions</FooterLink>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Licensing</FooterLink>
                    <FooterLink href="#">Cookie Policy</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                </ul>
                <div className="flex space-x-6 sm:justify-center">
                    <SocialIcon href="#" Icon={FaFacebook} />
                    <SocialIcon href="#" Icon={FaInstagram} />
                    <SocialIcon href="#" Icon={FaSkype} />
                    <SocialIcon href="#" Icon={FaTwitter} />
                    <SocialIcon href="#" Icon={FaGithub} />
                </div>
            </footer>
            <p className="my-10 text-sm text-center text-gray-500">
                &copy; 2018-2024{" "}
                <a
                    href="https://logicpulse.site/"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LogicPulse.site
                </a>
                . All rights reserved.
            </p>
        </div>
    );
}
