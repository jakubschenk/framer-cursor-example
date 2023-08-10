"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import useCursor from "../context/cursor-provider";

type ImageLinkProps = {
  src: string;
  href: string;
  alt: string;
  width: number;
  height: number;
};

export default function ImageLink({
  src,
  href,
  alt,
  width,
  height,
}: ImageLinkProps) {
  const { setCursor, resetCursor, accentColor } = useCursor();

  return (
    <Link
      className="dark:text-black text-white font-medium cursor-none overflow-hidden flex flex-col lg:pointer-events-auto lg:p-0 rounded-md border-black dark:border-white border max-w-xl"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() =>
        setCursor({
          variant: "withText",
          content: (
            <motion.span
              variants={{
                default: { opacity: [1, 0.1, 0] },
                withText: { opacity: [0, 0.1, 1] },
              }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              Need a design?
            </motion.span>
          ),
          bgColor: accentColor,
        })
      }
      onMouseLeave={() => resetCursor()}
    >
      <Image src={src} width={width} height={height} priority alt={alt} />
      <div className="flex flex-col justify-start gap-2 p-4 text-black dark:bg-white dark:text-black">
        <span className="text-lg">webscope.design</span>
        <div className="border-b border-black" />
        <p className="font-normal text-sm">
          Crafting eye-catching designs with intuitive user experiences that
          resonate with your audience, making your brand stand out in today's
          market.
        </p>
      </div>
    </Link>
  );
}
