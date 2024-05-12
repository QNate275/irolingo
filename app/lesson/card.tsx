import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
type Props = {
  id: number;
  audioSrc: string | null;
  imageSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status: "correct" | "wrong" | "none";
  type: (typeof challenges.$inferSelect)["type"];
};
const Card = ({
  id,
  audioSrc,
  imageSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: Props) => {
  return (
    <div
      onClick={() => {}}
      className={cn(
        "h-full border-2 rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "bg-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          " bg-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          " border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && " pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}
    </div>
  );
};

export default Card;
