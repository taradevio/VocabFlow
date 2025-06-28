import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

export const Benefits = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Why />
    </QueryClientProvider>
  );
};

const Why = () => {
  const fetchBenefits = async () => {
    const res = await fetch("/benefits.json");
    return res.json();
  };

  const { data, error } = useQuery({
    queryKey: ["benefits"],
    queryFn: fetchBenefits,
  });

  return (
    <section>
      <div className="py-10">
        <h2 className="text-2xl sm:text-6xl font-bold text-center">
          Why It Works <span className="text-[#4F46E5]">(Better)</span>
        </h2>
        <p className="text-center pt-3 pb-2 sm:text-lg sm:w-xl sm:mx-auto">
          Language learners often forget new vocabulary because they don’t
          review it often enough, or never actually use it in writing. We built
          this app based on proven learning methods
        </p>

        <div className="py-5 sm:grid sm:grid-cols-2">
          {error && <p>{error.message}</p>}
          {data?.map((item) => (
            <div key={item.id} className="">
              <div className="text-center w-fit mx-auto">
                <img src={item.icon} alt="" className="inline-block"/>
              </div>
              <div className="text-center pt-2 pb-10 lg:w-md lg:mx-auto">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
