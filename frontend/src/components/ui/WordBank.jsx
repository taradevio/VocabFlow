export const WordBank = () => {
  const getWords = JSON.parse(localStorage.getItem("user"));
  console.log(getWords);

  return (
    <div className="ps-5 pe-5 my-5">
      <div className="flex items-center justify-between border-1 rounded-lg p-3">
        <div>
          <h2 className="text-2xl font-semibold">Word Bank</h2>
          <p>Your Personal Vocabularies Collection</p>
        </div>
        <div>
          <span className="block text-end">0</span>
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
          <button className="border-1 py-1 px-2 rounded-md">All</button>
          <button className="border-1 py-1 px-2 rounded-md">Easy</button>
          <button className="border-1 py-1 px-2 rounded-md">Medium</button>
          <button className="border-1 py-1 px-2 rounded-md">Hard</button>
        </div>
      </div>

      {getWords ? (
        <div className="grid grid-cols-3 gap-5 mt-8">
          {getWords?.map((word, index) => (
            <div key={index} className="border-1 rounded-md p-5">
              <div className="flex items-center justify-between">
                <h3>{word.word}</h3>
                <div>
                  <span>Medium</span>
                </div>
              </div>

              <p>
                A word with meaning related to dd. This definition was generated
                automatically.
              </p>
              <div>
                <p>"Example usage of the word "dd" in a sentence."</p>
              </div>
              <div>
                <p>Added on</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <button className="border-1 py-1 px-2 rounded-md">Practice</button>
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
