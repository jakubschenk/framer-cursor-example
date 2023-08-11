"use client";

import Link from "next/link";
import useCursor from "../context/cursor-provider";
import WebscopeLogo from "../resources/webscope-logo";
import { motion } from "framer-motion";

export default function Footer() {
  const { setCursor, resetCursor, accentColor } = useCursor();

  return (
    <Link
      className="dark:text-white cursor-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      href="https://webscope.io"
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
              Visit our site!❤️
            </motion.span>
          ),
          bgColor: accentColor,
        })
      }
      onMouseLeave={() => resetCursor()}
    >
      By <WebscopeLogo />
    </Link>
  );
}
