import { Button } from "./ui/Button";

export const Hero = () => {
  return (
    <section id="hero">
      <div className="pt-5 sm:pt-27">
        <div className="text-2xl sm:text-6xl font-bold text-center sm:leading-18">
          <h1>You're not bad at English</h1>
          <h1 className="text-[#4F46E5]">You just need reminders that work</h1>
        </div>

        <p className="text-center py-3 sm:text-lg">
          Build your personal word bank, get daily reminders, and practice your
          English
        </p>
        <Button />

        <div className="w-[300px] pt-10 mx-auto block sm:hidden">
            <img src="/mobile-hero.png" alt="hero image" className="w-full object-cover"/>
        </div>
        <div className="sm:w-xl lg:w-4xl pt-10 mx-auto hidden sm:block">
            <img src="/hero.png" alt="hero image" className="w-full object-cover"/>
        </div>
      </div>
    </section>
  );
};
