import { Outlet } from "react-router";
import { Toaster } from "sonner";

export const Content = () => {
  return (
    <section className="h-full lg:flex-1 lg:overflow-auto">
      {/* put width full doesnt work using div bellow since it has not fixed width. Applying flex-1 doesnt either, so put the flex in section */}
      <div className="">
        {/* <div className="">
            <img src="https://images.pexels.com/photos/1553963/pexels-photo-1553963.jpeg" alt="image" className="w-full object-cover" />
        </div> */}
        <Outlet />
        <Toaster expand={true} richColors />

      </div>
    </section>
  );
};
