import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheck, HiOutlineArrowSmRight } from "react-icons/hi";
import MarketSearch from "./MarketSearch";

import { supabaseServer } from "@/lib/supabase-server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Page",
};

const HomePage = async () => {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/auth/login");
  }
  return (
    <main>
      <Link
        href="https://wa.me/13024262298"
        className="fixed bottom-5 right-0 inline-flex animate-pulse items-center gap-2 whitespace-nowrap rounded-l-full bg-[rgb(38,211,103)] px-4 py-3 font-semibold text-white shadow-[0px_8px_24px_0px_rgba(38,211,103,.2)] md:bottom-20"
      >
        <FaWhatsapp className="h-6 w-6" />
      </Link>
      <HeroSection />
      {/* <MarketView /> */}
      <ClientsSection />
      {/* <FAQ /> */}
      {/* <Contact /> */}
    </main>
  );
};

export default HomePage;

const HeroSection = async () => {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-screen items-center justify-between bg-local"
      style={{
        backgroundImage: `url("/blue_wave_bg.webp")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto w-full max-w-8xl">
        <div className="mx-auto flex max-w-4xl flex-col items-start px-5 pb-10 pt-24 sm:items-center">
          <div className="flex flex-col items-start rounded-2xl border-2 border-white bg-white bg-opacity-25 p-5 backdrop-blur sm:items-center sm:rounded-3xl md:p-10">
            <h1 className="text-4xl font-bold tracking-tight text-primary-900 sm:text-center sm:text-5xl">
              Streamline Your VoIP Trading Experience
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-900 sm:text-center">
              Unlock new possibilities and maximize your VoIP trading potential
              with LCR Telcom&apos;s cutting-edge platform.
            </p>
            <div className="mt-10 flex flex-col items-start justify-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="/post/offers"
                className={`${buttonVariants({
                  variant: "default",
                })}`}
              >
                Post your route offers
                <HiOutlineArrowSmRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                passHref
                href="/post/targets"
                className={`${buttonVariants({
                  variant: "secondary",
                })}`}
              >
                Post your buying targets
                <HiOutlineArrowSmRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="sp-shadow mt-5 w-full rounded-2xl border bg-white p-5 sm:rounded-3xl md:mt-10">
            <h2 className="text-xl font-bold tracking-tight text-primary-900 sm:text-center lg:text-2xl">
              Market View
            </h2>
            <p className="sm:text-md mb-4 leading-8 text-gray-400 sm:text-center">
              Real-time Routes at Your Fingertips
            </p>
            <MarketSearch />
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientsSection = () => {
  return (
    <section id="features" className="bg-white py-14 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Empower Your Trading Experience
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover, Buy, Sell, Compare, and Request Tailored Routes for Your
            Communication Needs
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Sell VoIP Routes
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                List and manage your VoIP routes for potential clients to
                explore and purchase.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Buy VoIP Routes
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Browse and buy high-quality VoIP routes from trusted users in
                the market.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Real-time Market View
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Stay updated with the latest market rates for VoIP routes in
                real-time.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Route Request
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Clients can submit route requests, specifying their desired
                destinations and requirements.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Route Comparison
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Compare routes based on rates, quality, and performance metrics
                like ASR and ACD.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Route Management
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Edit, update, and remove your route listings with ease for
                accurate and up-to-date information.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Advanced Filtering
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Easily filter routes based on destination, rate, route type, and
                other relevant criteria.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-primary-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 bg-opacity-10">
                  <HiCheck className="h-6 w-6 text-primary-900" />
                </div>
                Notifications
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Receive instant notifications about route inquiries, purchases,
                and updates to stay connected.
              </dd>
            </div>
          </dl>
        </div>
        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-start justify-between rounded-xl bg-surface px-8 py-10 sm:mt-20 md:flex-row md:items-center md:px-16 md:py-20 lg:mt-24 lg:max-w-5xl">
          <h3 className="text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Ready to dive in? <br />
            Sign up to start Trading.
          </h3>
          <Link
            href="/auth/signup"
            className="mt-8 self-end rounded-xl bg-primary-900 px-3.5 py-2.5 text-base font-medium text-white md:mt-0 md:self-center"
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
      answer:
        "Simply create an account, navigate to the &#39;Sell Routes&#39; section, and list your routes with relevant details. Interested clients can then view and purchase them.",
    },
    {
      question: "How can I buy VoIP routes?",
      answer:
        "Browse through the available routes in the &#39;Buy Routes&#39; section. Use advanced filtering options to find routes that match your requirements, and proceed to purchase securely.",
    },
    {
      question: "Can I request Link specific route that is not listed?",
      answer:
        "Absolutely! In the &#39;Route Request&#39; section, you can submit your specific requirements, such as destination and capacity, and our users will review and respond to your request.",
    },
    {
      question: "How do I ensure the quality of the routes I purchase?",
      answer:
        "Our platform provides important information such as ASR, ACD, and user ratings to help you make informed decisions. Additionally, client reviews and feedback contribute to Link trustworthy trading environment.",
    },
    {
      question: "What happens after I make Link purchase?",
      answer:
        "Upon successful purchase, you will receive access to the purchased route details. The user will coordinate with you regarding any necessary configuration or additional information.",
    },
    {
      question: "Are my transactions secure?",
      answer:
        "Absolutely! We prioritize the security of your transactions. Our platform utilizes secure payment gateways and offers optional escrow services for added peace of mind.",
    },
    {
      question: "Can I manage and update my route listings?",
      answer:
        "Yes, our user-friendly dashboard allows you to easily manage your route listings. You can edit, update, or remove listings as needed to ensure accurate and up-to-date information.",
    },
    {
      question: "How can I stay updated on the latest market rates?",
      answer:
        "Our real-time market view provides you with instant access to the current selling rates of VoIP routes, allowing you to make well-informed decisions.",
    },
    {
      question: "Do you have customer support available?",
      answer:
        "Certainly! If you have any further questions or concerns, please don&#39;t hesitate to contact our support team. We&#39;re here to assist you.",
    },
  ];
  return (
    <section id="faq" className="bg-surface py-16 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mx-auto mt-2 max-w-3xl text-center text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <dl className="mx-auto mt-8 divide-y divide-gray-300 sm:mt-10 md:max-w-4xl lg:px-0">
          {FaqContent.map((item, index) => (
            <div
              key={index}
              className="mt-10 grid gap-5 pt-10 text-base lg:grid-cols-5"
            >
              <dt className="col-span-2 font-semibold text-primary-900">
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
        <h2 className="mb-10 text-center text-4xl font-extrabold tracking-tight text-primary-900">
          Contact Us
        </h2>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-primary-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-primary-900 shadow-sm focus:border-primary-900 focus:ring-primary-900"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-primary-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm text-primary-900 shadow-sm focus:border-primary-900 focus:ring-primary-900"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-primary-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={6}
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-primary-900 shadow-sm focus:border-primary-900 focus:ring-primary-900"
              placeholder="Leave Link comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-primary-900 px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-900 sm:w-fit"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};
