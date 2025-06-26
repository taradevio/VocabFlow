import { Button } from "./ui/Button";

export const CTA = () => {
  return (
    <section>
      <div className="pt-15 pb-20 text-center">
        <h2 className="text-2xl font-bold">You don’t need another app. You need a system that works.</h2>
        <p className="py-2">
          Now in beta — try the system designed to make vocab stick through
          writing, feedback, and habit.
        </p>
        <Button />
      </div>
    </section>
  );
};
