import { Content } from "./ui/ContentPanel";
import { Sidebar } from "./ui/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-dvh w-full max-w-7xl">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Dashboard;
