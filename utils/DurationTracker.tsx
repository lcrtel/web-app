"use client";
import { supabaseClient } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { useIdle } from "react-haiku";
import toast from "react-hot-toast";
const DurationTracker = () => {
  const [startTime, setStartTime] = useState(Date.now());
  const supabase = supabaseClient();
  const idle = useIdle(20000);
  useEffect(() => {
    async function updateDuration(duration: number) {
      const durationInSeconds = Math.floor(duration / 1000);
      if (durationInSeconds > 0) {
        const { error } = await supabase
          .from("user_durations")
          .insert({ duration: durationInSeconds });
      }
    }
    if (idle) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      updateDuration(duration);
    } else if (!idle) {
      setStartTime(Date.now());
    }
  }, [idle]);

  return null;
};

export default DurationTracker;
