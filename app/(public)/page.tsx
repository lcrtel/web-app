import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import MarketSearch from "./MarketSearch";

import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Home Page",
};

const HomePage = async () => {
  return (
    <>
      <Link
        href="https://wa.me/13024262298"
        className="fixed bottom-5 right-0 inline-flex animate-pulse items-center gap-2 whitespace-nowrap rounded-l-full bg-[rgb(38,211,103)] px-4 py-3 font-semibold text-white shadow-[0px_8px_24px_0px_rgba(38,211,103,.2)] md:bottom-20"
      >
        <FaWhatsapp className="h-6 w-6" />
      </Link>
      <HeroSection />
    </>
  );
};

export default HomePage;

const HeroSection = async () => {
  const supabase = supabaseServer();
  const { data: routes } = await supabase
    .from("routes")
    .select("*")
  return (
    <section className="relative mx-auto flex min-h-svh overflow-hidden bg-gradient-to-t from-primary-900 via-primary-100 via-70% to-surface pt-20">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-[linear-gradient(to_right,#a8a8a82d_1px,transparent_1px),linear-gradient(to_bottom,#a8a8a82d_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-20 mx-auto w-full max-w-8xl py-10 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-5 sm:items-center md:gap-20">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-900 sm:text-center sm:text-5xl">
              Streamline Your VoIP Trading Experience
            </h1>
            <p className="max-w-2xl text-base text-primary-900 sm:text-center sm:text-lg sm:leading-8">
              Unlock new possibilities and maximize your VoIP trading potential
              with LCRTel&apos;s cutting-edge platform.
            </p>
            <div className="flex w-full flex-wrap items-start gap-4 sm:items-center sm:justify-center">
              <Link
                href="/u/post-offers"
                className={`${buttonVariants({
                  variant: "default",
                })}`}
              >
                Sell VoIP routes
                <HiOutlineArrowSmRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                passHref
                href="/u/post-targets"
                className={`${buttonVariants({
                  variant: "secondary",
                })}`}
              >
                Buy VoIP routes
                <HiOutlineArrowSmRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="w-full space-y-4 rounded-2xl border bg-white p-5 sm:rounded-3xl">
            <h2 className="text-xl font-bold tracking-tight text-primary-900 sm:text-center lg:text-2xl">
              Market View
            </h2>
            {routes && <MarketSearch initialRoutes={routes} />}
          </div>
        </div>
      </div>
    </section>
  );
};
