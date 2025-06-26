import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

export function Features() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GetFeatures />
    </QueryClientProvider>
  );
}

const GetFeatures = () => {
  const fetchFeatures = async () => {
    const res = await fetch("/features.json");
    return res.json();
  };

  const { data, error } = useQuery({
    queryKey: ["features"],
    queryFn: fetchFeatures,
  });

  return (
    <section>
      <div className="py-10">
        <div className="text-2xl font-bold text-center">
          <h2>Keep forgetting vocabs? Inconsistent practice?</h2>
          <h2 className="text-[#4F46E5]">We've all been there</h2>
        </div>
        <p className="text-center py-2">Here's how it helps you stay on track</p>
        <div className="py-5">
          {error && <p>{error.message}</p>}
          {data?.map((item) => (
            <div key={item.id} className="pt-8">
              <div className="text-center pb-5">
                <h3 className="text-xl font-semibold pb-1">{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <img src={item.image} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
