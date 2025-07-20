import { LineChart } from "./Line";
import { PieChart } from "./Pie";
import { Header } from "./AnalyticsHeader";
import { useEffect, useState, useMemo } from "react";

export const Analytics = () => {
  const [getWordBank, setGetWordBank] = useState([]);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("user") || "[]");
    setGetWordBank(getData);
  }, []);

  const today = new Date().toLocaleDateString();

  const todayNewWords = useMemo(() => {
    return getWordBank.filter((word) => word.added_on === today).length;
  }, [getWordBank, today]);

  const todayPractice = getWordBank.filter((word) => word.is_practiced === true && word.added_on === today).length
  console.log(todayPractice)

  return (
    <div className="ps-5 pe-5">
      <Header />
      <div className="flex justify-between gap-5 ">
        {/* first elem */}
        <div className="border-1 rounded-md px-3 py-10 flex-1 text-center">
          <h1 className="text-xl font-medium">Daily Streak</h1>
          <span className="text-5xl font-bold inline-block py-2">5</span>
          <p>Days in a row</p>
        </div>

        <div className="border-1 rounded-md px-3 py-10 flex-1 text-center">
          <h1 className="text-xl font-medium">Words Practiced</h1>
          <span className="text-5xl font-bold inline-block py-2">{todayPractice}</span>
          <p>Out of {getWordBank.length} today</p>
        </div>

        <div className="border-1 rounded-md px-3 py-10 flex-1 text-center">
          <h1 className="text-xl font-medium">New Words</h1>
          <span className="text-5xl font-bold inline-block py-2">
            {todayNewWords}
          </span>
          <p>Added today</p>
        </div>

        <div className="border-1 rounded-md px-3 py-10 flex-1 text-center">
          <h1 className="text-xl font-medium">Total Words</h1>
          <span className="text-5xl font-bold inline-block py-2">
            {getWordBank.length}
          </span>
          <p>in Word Bank</p>
        </div>
      </div>

      {/* third elem */}
      <div className="flex justify-between gap-5 my-5">
        <div className="p-5 rounded-md border-1 flex-1">
          <h2 className="text-lg font-bold">Learning Progress</h2>
          <LineChart />
        </div>

        <div className="p-5 rounded-md border-1 flex-1">
          <h2 className="text-lg font-bold">Parts of Speech</h2>
          <PieChart />
        </div>
      </div>

      {/* second elem */}
      <div className="my-5 border-1 rounded-md p-5">
        <div className="mb-5">
          <h2 className="text-lg font-bold">Weekly Performance</h2>
          <p>Your learning metrics</p>
        </div>
        <div className="flex justify-between gap-5">
          <div className="border-1 rounded-md px-3 py-5 flex-1 text-center bg-blue-50">
            <span className="block text-xl font-semibold ">20 minutes</span>
            <span className="block">Time Spent</span>
          </div>
          <div className="border-1 rounded-md px-3 py-5 flex-1 text-center bg-green-50">
            <span className="block text-xl font-semibold ">20</span>
            <span className="block">Words Learned</span>
          </div>
          <div className="border-1 rounded-md px-3 py-5 flex-1 text-center bg-purple-50">
            <span className="block text-xl font-semibold ">20</span>
            <span className="block">Words Learned</span>
          </div>
          <div className="border-1 rounded-md px-3 py-5 flex-1 text-center bg-orange-50">
            <span className="block text-xl font-semibold ">87%</span>
            <span className="block">Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
