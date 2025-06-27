import { Button } from "./ui/Button";

export const CTA = () => {
  return (
    <section>
      <div className="pt-15 pb-20 sm:pb-15 text-center">
        <h2 className="text-2xl sm:text-5xl font-bold">You don’t need another app. </h2>
        <h2 className="text-2xl sm:text-5xl font-bold">You need a system that works.</h2>
        <p className="pt-3 pb-5 sm:text-xl">
          Now in beta — try the system designed to make vocab stick through
          writing, feedback, and habit.
        </p>
        <Button />
      </div>
    </section>
  );
};
