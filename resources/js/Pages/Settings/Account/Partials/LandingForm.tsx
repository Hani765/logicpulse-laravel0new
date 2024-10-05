import HeroUpdate from "./landing/Here/HeroUpdate";
import PartnersUpdate from "./landing/partners/partners";

export default function LandingForm() {
    return (
        <>
            <div className="">
                <h1 className="text-lg font-bold">Landing Page Coustmize</h1>
                <p className="text-sm">Coustmize landing page from here.</p>
            </div>
            <div className="flex flex-wrap w-full gap-4 border rounded p-2">
                <HeroUpdate />
                <PartnersUpdate />
            </div>
        </>
    );
}
