import { Content } from "./ui/ContentPanel";
import { Sidebar } from "./ui/Sidebar";
import { Toaster } from "sonner";

const Dashboard = () => {
  return (
    <div className="flex h-dvh w-full max-w-7xl">
      <Sidebar />
      <Content />
      <Toaster 
      position="top-center"
      expand={true}
      richColors
      />
    </div>
  );
};

export default Dashboard;
