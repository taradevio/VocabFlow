import { useEffect } from "react";

export function DailyReset() {
  useEffect(() => {
    const resetPractice = () => {
      // get reset which should be empty if last reset is not today
      const lastReset = localStorage.getItem("last_reset");
      const today = new Date().toLocaleDateString();

      // if last reset is not today, reset the is practice and last practice, then set local to  reset as well as the last reset
      if (lastReset !== today) {
        const getData = JSON.parse(localStorage.getItem("user") || "[]");

        const reset = getData.map((word) => {
          return {
            ...word,
            is_practiced: false,
            last_practiced: null,
          };
        });

        localStorage.setItem("user", JSON.stringify(reset));
        localStorage.setItem("last_reset", today);
      }
    };

    resetPractice();

    // will check every minute
    const checkMinute = setInterval(resetPractice, 60000);
    return () => clearInterval(checkMinute);
  }, []);
}
