"use client";

import React from "react";
import { motion } from "framer-motion";
import { supabaseClient } from "@/lib/supabase-client";

export default function Template({ children }: { children: React.ReactNode }) {
    const supabase = supabaseClient();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("PASSWORD_RECOVERY", session);
        // show screen to update user's password
      }
    });
    return (
        <motion.div
            initial={{ y: 2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
