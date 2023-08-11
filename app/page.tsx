"use client";

import { useState } from "react";
import { CursorProvider } from "@/components/context/cursor-provider";
import { ColorPicker } from "@/components/ui/color-picker";
import Footer from "@/components/ui/footer";
import ImageLink from "@/components/ui/image-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const [accent, setAccent] = useState("#23F12A");
  return (
    <CursorProvider accentColor={accent}>
      <main className="flex text-black dark:text-white bg-white dark:bg-black min-h-screen flex-col items-center justify-around p-24 gap-y-12">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>
        <div className="flex gap-y-3 text-center flex-col items-center">
          <h1 className="text-4xl font-medium">Framer Motion Cursor Demo</h1>
          <p>Note: cursor is disabled on devices without a mouse</p>
          <div className="flex justify-center items-center gap-x-4">
            Pick a color:
            <ColorPicker color={accent} setColor={setAccent} />
          </div>
        </div>
        <div className="flex flex-col gap-y-3 font-xl font-medium">
          We just released a site!
          <ImageLink
            src="/images/banner.png"
            href="https://webscope.design"
            alt="Webscope.design - UX/UI designers for you next project"
            width={1200}
            height={600}
          />
        </div>
        <Footer />
      </main>
    </CursorProvider>
  );
}
