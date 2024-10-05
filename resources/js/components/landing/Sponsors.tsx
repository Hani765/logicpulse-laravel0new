import Marquee from "react-fast-marquee";
import { Skeleton } from "../ui/skeleton";
import useFetch from "@/hooks/usefetch";
interface DataType {
    title: string;
    desc: string;
    link: string; // Assuming this field is for dynamic link
}
export default function Sponsors() {
    const { data, isLoading, error } = useFetch("/landing/partners");
    return (
        <section id="partners" className="container pt-2 sm:py-24">
            <div className="bg-muted/50 border rounded-lg py-12">
                <h2 className="text-center text-md lg:text-xl font-bold mb-8">
                    MEET OUR <span className="text-primary">PARTNERS.</span>
                </h2>
                <Marquee pauseOnHover className="grid grid-cols-3 z-10">
                    {isLoading ? (
                        <>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                                <Skeleton
                                    className="w-60 h-40 rounded mx-2"
                                    key={index}
                                />
                            ))}
                        </>
                    ) : error ? (
                        <div className="text-center text-red-500">
                            Error loading data
                        </div>
                    ) : (
                        <></>
                    )}
                </Marquee>
            </div>
        </section>
    );
}
