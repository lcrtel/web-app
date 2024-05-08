"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const NotificationsPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" rounded-2xl text-primary-500">
        You don&apos;t have any notifications
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
