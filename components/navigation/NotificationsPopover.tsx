"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { PopoverArrow } from "@radix-ui/react-popover";

const NotificationsPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild >
        <Button variant="outline" size="icon">
          <Bell className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent avoidCollisions collisionPadding={20} className=" rounded-2xl text-primary-900">
        You don&apos;t have any notifications
        <PopoverArrow className="fill-slate-200" />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
