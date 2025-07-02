import { Button, Badge } from "@radix-ui/themes";

export const WordBank = () => {
  const getWords = JSON.parse(localStorage.getItem("user"));
  const getTotalWords = getWords ? Object.keys(getWords).length : 0;

  const getFirst = getWords[0].word;
  console.log(getFirst.charAt(0).toUpperCase())

  return (
    <div className="ps-5 pe-5 my-5">
      <div className="flex items-center justify-between border-1 rounded-lg p-3">
        <div>
          <h2 className="text-2xl font-semibold">Word Bank</h2>
          <p>Your Personal Vocabularies Collection</p>
        </div>
        <div>
          <span className="block text-end text-4xl font-bold">
            {getTotalWords}
          </span>
          <p>Total Words</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 justify-around items-center my-8">
        <div className="border-1 rounded-md text-center py-5">
          <span>0</span>
          <p>Mastered</p>
        </div>
        <div className="border-1 rounded-md text-center py-5">
          <span>0</span>
          <p>Learned</p>
        </div>
        <div className="border-1 rounded-md text-center py-5">
          <span>0</span>
          <p>New Words</p>
        </div>
      </div>

      <div className="flex justify-between items-center p-3 border-1 rounded-md gap-2">
        <div className="flex-1">
          <form className="relative">
            <div className="absolute top-[50%] left-2 translate-y-[-50%]">
              <img src="/search.svg" alt="search" />
            </div>
            <input
              type="text"
              className="border-1 w-full py-1 px-8 rounded-md"
              placeholder="Search words"
            />
          </form>
        </div>
        <div className="p-1 flex gap-2">
          <Button>All</Button>
          <Button>Beginner</Button>
          <Button>Intermediate</Button>
          <Button>Advanced</Button>
        </div>
      </div>

      {getWords ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
          {getWords?.map((word, index) => (
            <div key={index} className="border-1 rounded-md p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{word.word.charAt(0).toUpperCase() + word.word.slice(1)}</h3>
                <div>
                  <Badge color="tomato">Advanced</Badge>
                </div>
              </div>
              <div>
                <Badge color="bronze">Verb</Badge>
              </div>
              <p className="text-[#666666] text-sm py-3">
                Having a ready insight into and understanding of things; showing
                acute mental discernment.
              </p>
              <div className="bg-[#f4f5f4] text-xs p-3 italic">
                <p>
                  "Her perspicacious analysis of the market trends impressed the
                  entire board."
                </p>
              </div>
              <div className="pt-3">
                <p className="text-xs">📅 Added on {word.added_on}</p>
              </div>
              <hr className="my-3" />
              <div className="flex items-center justify-between mt-2">
                <div>
                  <Button>Practice</Button>
                </div>
                <div className="cursor-pointer">
                  <img src="/delete.svg" alt="delete" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border-1 w-full text-center p-8 mt-8">
          <h3 className="text-2xl">No words yet</h3>
          <p className="">
            Start building your vocabulary by adding your first word!
          </p>
        </div>
      )}
    </div>
  );
};
