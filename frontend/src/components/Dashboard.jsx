// import "@radix-ui/themes/styles.css";
// import { Theme } from "@radix-ui/themes";
import { Content } from "./ui/ContentPanel";
import { Sidebar } from "./ui/Sidebar";
import { SidebarMobile } from "./ui/SidebarMobile";
import { DailyReset } from "../hooks/DailyReset";
import { useEffect, useState } from "react";
import { Skeleton } from "@radix-ui/themes";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  DailyReset();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row h-dvh w-full max-w-7xl ps-5 pe-5 lg:ps-0 lg:pe-0">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:flex justify-center flex-col w-[240px] border-r pr-4 space-y-4 py-4">
          <Skeleton className="h-8 w-3/4 ml-4" />
          <Skeleton className="h-6 w-5/6 ml-4" />
          <Skeleton className="h-6 w-5/6 ml-4" />
          <Skeleton className="h-6 w-5/6 ml-4" />
        </div>

        {/* Mobile Sidebar Skeleton */}
        <div className="lg:hidden flex items-center justify-between py-4 px-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-4 space-y-6 my-auto">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-dvh w-full max-w-7xl ps-5 pe-5 lg:ps-0 lg:pe-0">
      <Sidebar />
      <SidebarMobile />
      <Content />
    </div>
  );
};

export default Dashboard;
