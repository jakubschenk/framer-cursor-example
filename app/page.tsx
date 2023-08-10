import Footer from "@/components/ui/footer";
import ImageLink from "@/components/ui/image-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <main className="flex text-black dark:text-white bg-white dark:bg-black min-h-screen flex-col items-center justify-around p-24 gap-y-12">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <div className="flex gap-y-3 text-center flex-col">
        <h1 className="text-4xl font-medium">Framer Motion Cursor Demo</h1>
        <p>Note: cursor is disabled on devices without a mouse</p>
      </div>
      <div className="flex flex-col gap-y-3 font-xl font-medium">
        We just released a site!
        <ImageLink
          src="/images/banner.png"
          href="https://webscope.design"
          alt="Webscope.design - UX/UI designers for you next project"
          width={1200}
          height={600}
        />{" "}
      </div>
      <Footer />
    </main>
  );
}
