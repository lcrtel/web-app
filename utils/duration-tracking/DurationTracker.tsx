"use client";
import { useEffect, useState } from "react";
import { useIdle } from "react-haiku";
import toast from "react-hot-toast";
import { updateDurationInDb } from "./actions";
const DurationTracker = () => {
  const [startTime, setStartTime] = useState(Date.now());
  const idle = useIdle(20000);
  useEffect(() => {
    async function updateDuration(duration: number) {
      const durationInSeconds = Math.floor(duration / 1000);
      if (durationInSeconds > 0) {
        const res = await updateDurationInDb(durationInSeconds);
        if (res?.error) {
          toast.error(res.error);
        }
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
