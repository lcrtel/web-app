"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircleQuestion, Minus, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Chat() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <div className="fixed bottom-0 right-0 p-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className=" size-14 drop-shadow-md"
          >
            <MessageCircleQuestion className="size-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className=" w-svw max-w-sm overflow-clip rounded-2xl p-0 text-primary-900 "
          align="end"
        >
          <div className="flex h-[60svh] flex-col justify-between">
            <div className="flex items-center justify-between bg-surface px-4 py-2">
              <h2 className=" text-lg font-medium">LCRTel Support</h2>
              <Button variant="ghost" size="icon" onClick={toggle}>
                <Minus className=" size-4" />
              </Button>
            </div>
            <div className="flex flex-1 flex-col-reverse gap-4 overflow-y-auto p-4 pb-2">
              <div className="flex gap-2">
                <p className="rounded-md bg-surface px-2 py-1">
                  Hi, how can I help you?
                </p>
              </div>
            </div>
            <form className="flex items-center justify-between gap-2 p-4 pt-2">
              <Input className="flex-1" />
              <Button variant="ghost" size="icon">
                <Send className=" size-5" />
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
