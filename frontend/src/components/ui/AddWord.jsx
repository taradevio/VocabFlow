import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button, Dialog, TextArea, Flex, Text } from "@radix-ui/themes";

export const AddWord = () => {
  const [word, setWord] = useState("");
  // use separate state for showing word
  const [showWord, setShowWord] = useState("");
  const [wordBank, setWordBank] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      setTimeout(() => {
        toast.error("Cannot be empty!");
        setIsOpen(false);
        setIsLoading(false);
      }, 200);
      return;
    }

    // check if the word already exists. use some to check inside array of object and not includes
    if (wordBank.some((word) => word.word === userStructure.word)) {
      setIsLoading(true);
      setTimeout(() => {
        toast.warning(`${userStructure.word} already exists!`);
        setIsOpen(false);
        setIsLoading(false);
        setWord("");
      }, 500);
      return;
    }

    // add exisiting words from wordBank and add new words if there is any from userStructure
    const addWords = [...wordBank, userStructure];
    // then set the wordBank. This will return multiple data
    setIsLoading(true);
    setTimeout(() => {
      setWordBank(addWords);
      localStorage.setItem("user", JSON.stringify(addWords));
      toast.success(`${userStructure.word} added successfully!`);
      setIsOpen(!isOpen);
      setIsLoading(false);
      // clear input
      setWord("");
    }, 500);
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
              className="w-full border-1 py-3 px-4 rounded-md mb-3"
              onChange={(e) => setWord(e.target.value)}
              value={word}
            />
            <Dialog.Root open={isOpen} onChange={setIsOpen}>
              <Dialog.Trigger>
                {/* need a condition in which it shows error or words cannot be found if users enter random words that can't be found in English */}
                <Button
                  className="mt-3"
                  onClick={() => addWord()}
                  loading={isLoading}
                >
                  Add Word
                </Button>
              </Dialog.Trigger>
              <Dialog.Content maxWidth="450px">
                <Dialog.Title className="text-center">
                  Word Added Successfully✨
                </Dialog.Title>
                <Dialog.Description size="2" mb="2">
                  Add a new word to your vocabulary. Use AI to automatically
                  generate meanings and examples.
                </Dialog.Description>
                <div className="mb-2">
                  <Text size="8" className="font-semibold">
                    {/* capitalize the first letter */}
                    {showWord.charAt(0).toUpperCase() + showWord.slice(1)}
                  </Text>
                </div>
                <Flex direction="column" gap="3" mb="2">
                  <label className="text-md font-semibold">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Definition:
                    </Text>
                    <div className="relative">
                      <TextArea placeholder="Add the word's definition manually or generate with AI" />
                      <div className="absolute bottom-2 right-2 cursor-pointer">
                        <img src="/ai.svg" alt="ai icon" />
                      </div>
                    </div>
                  </label>
                </Flex>
                <Flex direction="column" gap="3">
                  <label className="text-md font-semibold">
                    <Text as="div" size="2" mb="1" weight="bold">
                      Examples:
                    </Text>
                    <div className="relative">
                      <TextArea placeholder="Enter an example manually or generate with AI" />
                      <div className="absolute bottom-2 right-2 cursor-pointer">
                        <img src="/ai.svg" alt="ai icon" />
                      </div>
                    </div>
                  </label>
                </Flex>
                <div className="mt-3 w-full" onClick={() => setIsOpen(false)}>
                  <Flex justify="end" gap="5">
                    <Button size="3">OK</Button>
                  </Flex>
                </div>
              </Dialog.Content>
            </Dialog.Root>
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
