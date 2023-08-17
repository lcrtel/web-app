import React from "react";
import { TargetsTable } from "./targets/targets-table";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { OffersTable } from "./offers/offers-table";
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const page = () => {
    redirect("/user/market/offers");
};

export default page;
