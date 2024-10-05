import { About } from "@/components/landing/About";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import Sponsors from "@/components/landing/Sponsors";
import { Team } from "@/components/landing/Team";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Welcome({ auth }: PageProps) {
    return (
        <div className="overflow-x-hidden">
            <Head title="Welcomd to LogicPulse" />
            <Navbar user={auth?.user} />
            <Hero />
            <Sponsors />
            <About />
            <HowItWorks />
            <Team />
            <FAQ />
            <Footer />
        </div>
    );
}
