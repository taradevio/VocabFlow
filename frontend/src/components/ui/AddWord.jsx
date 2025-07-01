import { toast } from "sonner";
import { useEffect, useState } from "react";

export const AddWord = () => {
  const [word, setWord] = useState("");
  // use separate state for showing word
  const [showWord, setShowWord] = useState("");
  const [wordBank, setWordBank] = useState([]);

  useEffect(() => {
    // on mount check local storage and get the words
    const getItems = JSON.parse(localStorage.getItem("user")) || [];
    setWordBank(getItems);
  }, []);

  function addWord() {
    const getUserData = word.trim().toLowerCase();
    setShowWord(getUserData);
    // add object structure
    const userStructure = {
      word: getUserData,
      definition: "",
      added_on: new Date().toLocaleDateString(),
      is_practiced: false,
    };

    // check if userStructure is empty
    if (!userStructure.word) {
      toast.error("Cannot be empty!");
      return;
    }

    // check if the word already exists. use some to check inside array of object and not includes
    if (wordBank.some((word) => word.word === userStructure.word)) {
      toast.warning(`${userStructure.word} already exists!`);
      setWord("")
      return;
    }

    // add exisiting words from wordBank and add new words if there is any from userStructure
    const addWords = [...wordBank, userStructure];
    // then set the wordBank. This will return multiple data
    setWordBank(addWords);
    localStorage.setItem("user", JSON.stringify(addWords));
    toast.success(`${userStructure.word} added successfully!`);

    // clear input
    setWord("");
  }

  return (
    <div className="grid place-content-center h-dvh relative">
      <div className="border-2 p-10 text-center w-3xl rounded-md">
        <h1 className="text-5xl">Add Your Word</h1>
        <p className="mt-3 mb-10">
          Enter your word and lets AI generate the definition for you
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="">
            <input
              type="text"
              placeholder="Enter your word e. g sophisticated, preposterous, abolish, etc"
              className="w-full border-1 py-3 px-4 rounded-md"
              onChange={(e) => setWord(e.target.value)}
              value={word}
            />
            <div className="mt-3">
              <button
                className="border-1 py-2 px-5 rounded-md cursor-pointer"
                onClick={() => addWord()}
              >
                Add Word
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <div className={`absolute top-[50%] left-[50%] translate-x-[-50%] ${showWord ? 'block' : 'hidden'}`}>
        <div>
          <h2>Word Added Successfully✨</h2>
          <div>
            <h3>{showWord}</h3>
            <p>Definition:</p>
            <p></p>
          </div>
        </div>
      </div> */}
    </div>
  );
};
