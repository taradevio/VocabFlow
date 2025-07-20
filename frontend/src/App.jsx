import "@radix-ui/themes/styles.css";
import { ReactLenis, useLenis } from "lenis/react";
import { Theme } from "@radix-ui/themes";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Benefits } from "./components/Why";
import { Questions } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Skeleton } from "@radix-ui/themes";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  const lenis = useLenis((lenis) => {
    console.log(lenis);
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center max-w-7xl">
        <div className="p-4 space-y-6 w-full mx-auto flex flex-col items-center">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-10 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <Theme>
      <div className="ps-3 pe-3 max-w-7xl">
        <Navbar />
        <Hero />
        <Features />
        <Benefits />
        <Questions />
        <CTA />
        <ReactLenis root />
      </div>
    </Theme>
  );
}

export default App;
