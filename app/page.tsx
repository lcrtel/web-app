import Nav from "@/components/Nav";
import Link from "next/link";
import React from "react";
import { HiCheck, HiOutlineArrowSmRight } from "react-icons/hi";
import Image from "next/image";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { RatesTable } from "./rates-table";
import { ScrollArea } from "@/components/ui/scroll-area";

export const dynamic = "force-dynamic";

const HomePage = async () => {
    const supabase = supabaseServer();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        redirect("/dashboard");
    }

    const HeroSection = () => (
        <section
            className="mx-auto flex min-h-[80vh] items-center justify-between bg-local"
            style={{
                backgroundImage: `url("/blue_wave_bg.jpg")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="mx-auto w-full max-w-8xl">
                <div className="flex max-w-2xl flex-col items-start py-32 px-10 text-left sm:py-48 lg:py-56">
                    <h1 className="text-4xl font-bold tracking-tight text-primary-500 sm:text-6xl">
                        Streamline Your VoIP Trading Experience
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Unlock new possibilities and maximize your VoIP trading
                        potential with LCR Telcom&apos;s cutting-edge platform.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="#features"
                            className="rounded-xl bg-primary-500 px-3 py-2 text-sm font-medium text-white"
                        >
                            Get Started
                        </Link>
                        <Link
                            passHref
                            href="#market"
                            className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-medium text-primary-500"
                        >
                            Check our Rates
                            <HiOutlineArrowSmRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );

    const MarketView = async () => {
        const supabase = supabaseServer();

        let { data: routes, error } = await supabase
            .from("routes")
            .select("destination, destination_code, rate, route_type, asr");

        return (
            <section id="market" className="bg-surface  pb-20 pt-24 sm:py-32">
                <div className="mx-auto max-w-8xl px-5 lg:px-8 flex">
                    <div className="mx-auto mb-16 max-w-2xl w-1/2">
                        <h2 className="text-3xl font-bold tracking-tight text-primary-500 lg:text-4xl">
                            Market View
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Real-time Market Rates at Your Fingertips
                        </p>
                    </div>
                    <ScrollArea className="mx-auto h-[500px] rounded-xl sp-shadow border bg-white w-1/2">
                        <RatesTable data={routes} />
                    </ScrollArea>
                </div>
            </section>
        );
    };

    const BuyersSection = () => {
        return (
            <section id="features" className="bg-white py-14 sm:py-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="mx-auto max-w-3xl lg:text-center">
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl">
                            Empower Your Trading Experience
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Discover, Buy, Sell, Compare, and Request Tailored
                            Routes for Your Communication Needs
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Sell VoIP Routes
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    List and manage your VoIP routes for
                                    potential buyers to explore and purchase.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Buy VoIP Routes
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Browse and buy high-quality VoIP routes from
                                    trusted users in the market.
                                </dd>
                            </div>

                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Real-time Market View
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Stay updated with the latest market rates
                                    for VoIP routes in real-time.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Route Request
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Buyers can submit route requests, specifying
                                    their desired destinations and requirements.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Route Comparison
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Compare routes based on rates, quality, and
                                    performance metrics like ASR and ACD.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Route Management
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Edit, update, and remove your route listings
                                    with ease for accurate and up-to-date
                                    information.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Advanced Filtering
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Easily filter routes based on destination,
                                    rate, route type, and other relevant
                                    criteria.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-primary-500">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 bg-opacity-10">
                                        <HiCheck className="h-6 w-6 text-primary-500" />
                                    </div>
                                    Notifications
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Receive instant notifications about route
                                    inquiries, purchases, and updates to stay
                                    connected.
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-3xl flex-col items-start justify-between rounded-xl bg-surface px-8 py-10 sm:mt-20 md:flex-row md:items-center md:px-16 md:py-20 lg:mt-24 lg:max-w-5xl">
                        <h3 className="text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl">
                            Ready to dive in? <br />
                            Sign up to start Trading.
                        </h3>
                        <Link
                            href="/signup"
                            className="mt-8 self-end rounded-xl bg-primary-500 px-3.5 py-2.5 text-base font-medium text-white md:mt-0 md:self-center"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </section>
        );
    };

    const FAQ = () => {
        const FaqContent = [
            {
                question: "How can I sell my VoIP routes on the platform?",
                answer: "Simply create an account, navigate to the &#39;Sell Routes&#39; section, and list your routes with relevant details. Interested buyers can then view and purchase them.",
            },
            {
                question: "How can I buy VoIP routes?",
                answer: "Browse through the available routes in the &#39;Buy Routes&#39; section. Use advanced filtering options to find routes that match your requirements, and proceed to purchase securely.",
            },
            {
                question:
                    "Can I request Link specific route that is not listed?",
                answer: "Absolutely! In the &#39;Route Request&#39; section, you can submit your specific requirements, such as destination and capacity, and our users will review and respond to your request.",
            },
            {
                question:
                    "How do I ensure the quality of the routes I purchase?",
                answer: "Our platform provides important information such as ASR, ACD, and user ratings to help you make informed decisions. Additionally, buyer reviews and feedback contribute to Link trustworthy trading environment.",
            },
            {
                question: "What happens after I make Link purchase?",
                answer: "Upon successful purchase, you will receive access to the purchased route details. The user will coordinate with you regarding any necessary configuration or additional information.",
            },
            {
                question: "Are my transactions secure?",
                answer: "Absolutely! We prioritize the security of your transactions. Our platform utilizes secure payment gateways and offers optional escrow services for added peace of mind.",
            },
            {
                question: "Can I manage and update my route listings?",
                answer: "Yes, our user-friendly dashboard allows you to easily manage your route listings. You can edit, update, or remove listings as needed to ensure accurate and up-to-date information.",
            },
            {
                question: "How can I stay updated on the latest market rates?",
                answer: "Our real-time market view provides you with instant access to the current selling rates of VoIP routes, allowing you to make well-informed decisions.",
            },
            {
                question: "Do you have customer support available?",
                answer: "Certainly! If you have any further questions or concerns, please don&#39;t hesitate to contact our support team. We&#39;re here to assist you.",
            },
        ];
        return (
            <section id="faq" className="bg-surface py-16 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="mx-auto mt-2 max-w-3xl text-center text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mx-auto mt-8 divide-y divide-gray-300 sm:mt-10 md:max-w-4xl lg:px-0">
                        {FaqContent.map((item, index) => (
                            <div
                                key={index}
                                className="mt-10 grid gap-5 pt-10 text-base lg:grid-cols-5"
                            >
                                <dt className="col-span-2 font-semibold text-primary-500">
                                    {item.question}
                                </dt>
                                <dd className="col-span-3">
                                    <p>{item.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>
        );
    };

    const Contact = () => {
        return (
            <section id="contact" className="bg-white py-14 sm:py-32">
                <div className="mx-auto max-w-3xl px-5 lg:px-8">
                    <h2 className="mb-10 text-4xl tracking-tight font-extrabold text-center text-primary-500">
                        Contact Us
                    </h2>
                    <form action="#" className="space-y-8">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-primary-500"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-primary-500 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                placeholder="name@flowbite.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-primary-500 "
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="block p-3 w-full text-sm text-primary-500 bg-gray-50 rounded-xl border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Let us know how we can help you"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-primary-500"
                            >
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={6}
                                className="block p-2.5 w-full text-sm text-primary-500 bg-gray-50 rounded-xl shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Leave Link comment..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-xl bg-primary-500 sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-500"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </section>
        );
    };

    const Footer = () => {
        return (
            <footer className="bg-surface px-6 py-10">
                <div className="mx-auto max-w-screen-xl">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link
                                passHref
                                href="/"
                                className="flex items-center"
                            >
                                <Image
                                    src="/lcrtelcom_logo.svg"
                                    className="mr-3 "
                                    alt="Flowbite Logo"
                                    width={180}
                                    height={20}
                                />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-primary-500 uppercase ">
                                    Legal
                                </h2>
                                <ul className="text-gray-600 ">
                                    <li className="mb-4">
                                        <Link
                                            href="#"
                                            className="hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="hover:underline"
                                        >
                                            Terms &amp; Conditions
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 sm:text-center ">
                            © 2023{" "}
                            <Link href="/" className="hover:underline">
                                LCRTelcom™
                            </Link>
                            . All Rights Reserved.
                        </span>
                    </div>
                </div>
            </footer>
        );
    };

    return (
        <main>
            <Nav />
            <HeroSection />
            <MarketView />
            <BuyersSection />
            <FAQ />
            <Contact />
            <Footer />
        </main>
    );
};

export default HomePage;
