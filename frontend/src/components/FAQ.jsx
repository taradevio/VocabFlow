import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

export const Questions = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GetQuestions />
    </QueryClientProvider>
  );
};

const GetQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const fetchFAQ = async () => {
    const res = await fetch("/questions.json");
    return await res.json();
  };

  const { data, error } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchFAQ,
  });

  const toggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section>
      {error && <p>{error.message}</p>}
      <div>
        <h2 className="text-2xl sm:text-6xl font-bold text-center pb-5">
          Frequently Asked Questions
        </h2>
        {data?.map((item, index) => (
          <div
            key={item.id}
            onClick={() => toggle(index)}
            className="border-b-1 my-5 cursor-pointer bg-[#4F46E5] text-white rounded-md sm:w-2xl sm:mx-auto"
          >
            <div className="p-4">
              <p className="font-semibold">{item.question}</p>
              <div className={`${activeIndex === index ? "block" : "hidden"} pt-3`}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
