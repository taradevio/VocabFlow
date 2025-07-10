import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Content } from "./ui/ContentPanel";
import { Sidebar } from "./ui/Sidebar";
import { PracticeProvider } from "../context/PracticeProvider";
import { SidebarMobile } from "./ui/SidebarMobile";

const Dashboard = () => {
  return (
    <PracticeProvider>
      <Theme>
        <div className="flex flex-col lg:flex-row h-dvh w-full max-w-7xl ps-5 pe-5 lg:ps-0 lg:pe-0">
          <Sidebar />
          <SidebarMobile />
          <Content />
        </div>
      </Theme>
    </PracticeProvider>
  );
};

export default Dashboard;
