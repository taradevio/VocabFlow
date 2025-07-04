import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Content } from "./ui/ContentPanel";
import { Sidebar } from "./ui/Sidebar";

const Dashboard = () => {
  return (
    <Theme>
      <div className="flex h-dvh w-full max-w-7xl">
        <Sidebar />
        <Content />
      </div>
    </Theme>
  );
};

export default Dashboard;
