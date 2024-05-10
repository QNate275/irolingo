import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  className?: string;
};
export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex bg-blue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 border-r-2 px-4 flex-col",
        className
      )}
    >
      Sidebar
    </div>
  );
};
