import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  TextArea,
  Flex,
  Text,
  Spinner,
} from "@radix-ui/themes";
import {
  useMutation,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function AddWord() {
  return (
    <QueryClientProvider client={queryClient}>
      <GetWord />
    </QueryClientProvider>
  );
}

const GetWord = () => {
  const [word, setWord] = useState("");
  // use separate state for showing word
  const [showWord, setShowWord] = useState("");
  const [wordBank, setWordBank] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDefinition, setIsLoadingDefinition] = useState(false);
  const [isLoadingExample, setIsLoadingExample] = useState(false);
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  useEffect(() => {
    // on mount check local storage and get the words
    const getItems = JSON.parse(localStorage.getItem("user")) || [];
    setWordBank(getItems);
  }, []);

  // mutation for definition
  const { mutate: generateDefinition } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("http://127.0.0.1:8787/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          message: [
            {
              role: "user",
              content: `Give a simple, clear definition of the word "${word}" like in a dictionary without mentioning back the given word. No example and no * symbol`,
            },
          ],
        }),
      });

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("No reader found on response");
        throw new Error("No response body");
      }
      const decoder = new TextDecoder();
      let buffer = "";
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let lineEnd;
        while ((lineEnd = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (line.startsWith("data: ")) {
            const json = line.slice(6);
            if (json === "[DONE]") break;

            try {
              const parsed = JSON.parse(json);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                result += content;
                // below is called batching in react
                setDefinition((prev) => prev + content);
              }
            } catch (err) {
              console.warn("Failed to parse chunk:", err);
            }
          }
        }
      }

      return result;
    },
    onMutate: () => {
      setIsLoadingDefinition(true);
      setDefinition("");
    },
    onSuccess: () => {
      setIsLoadingDefinition(false);
      toast.success("Definition sucessfully generated!");
    },
    onError: (err) => {
      console.error("Failed fetching:", err);
      toast.error("Failed to fetch definition");
    },
  });

  const { mutate: generateExample } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("http://127.0.0.1:8787/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          message: [
            {
              role: "user",
              content: `Give a sentence example of the given word "${word}" and no additional * symbol.`,
            },
          ],
        }),
      });

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("No reader found on response");
        throw new Error("No response body");
      }
      const decoder = new TextDecoder();
      let buffer = "";
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let lineEnd;
        while ((lineEnd = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (line.startsWith("data: ")) {
            const json = line.slice(6);
            if (json === "[DONE]") break;

            try {
              const parsed = JSON.parse(json);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                result += content;
                // below is called batching in react
                setExample((prev) => prev + content);
              }
            } catch (err) {
              console.warn("Failed to parse chunk:", err);
            }
          }
        }
      }

      return result;
    },
    onMutate: () => {
      setIsLoadingExample(true);
      setExample("");
    },
    onSuccess: () => {
      setIsLoadingExample(false);
      toast.success("Example sucessfully generated!");
    },
    onError: (err) => {
      console.error("Failed fetching:", err);
      toast.error("Failed to fetch example");
    },
  });

  function addWord() {
    // when use users add word, don't save it to storage first untill all definitions and examples are all complete
    const getUserData = word.trim().toLowerCase();
    setShowWord(getUserData);
    // add object structure
    const userStructure = {
      word: getUserData,
      definition: "",
      added_on: new Date().toLocaleDateString(),
      is_practiced: false,
      example: "",
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
      setDefinition("");
    }, 500);
  }

  function addDefinition() {
    // get the words from words stored in array
    const getWordBank = [...wordBank];
    // map the array, then if the current word matches with the word stored, return the existing word and add definition generated by AI saved inside definition state
    const update = getWordBank.map((word) => {
      if (word.word === showWord) {
        return {
          ...word,
          definition: definition,
          example: example,
        };
      } else {
        return word;
      }
    });

    // update the word bank
    setWordBank(update);
    // update the local storage
    localStorage.setItem("user", JSON.stringify(update));
    toast.success("Definition and example added successfully!");

    // if the word is random and not found in english, return undefined in the output of definition, then when users click ok, the logic needs to match if the value inside the input of definition is undefined. If it is, the users won't be able to save
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
                      {isLoadingDefinition ? (
                        <Spinner />
                      ) : (
                        <TextArea
                          placeholder="Add the word's definition manually or generate with AI"
                          value={definition}
                          resize="vertical"
                          onChange={(e) => {
                            setDefinition(e.target.value);
                          }}
                        />
                      )}
                      <div className="absolute bottom-2 right-2 cursor-pointer">
                        <img
                          src="/ai.svg"
                          alt="ai icon"
                          onClick={() => generateDefinition(showWord)}
                        />
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
                      {isLoadingExample ? (
                        <Spinner />
                      ) : (
                        <TextArea
                          placeholder="Enter an example manually or generate with AI"
                          value={example}
                          resize="vertical"
                          onChange={(e) => {
                            setExample(e.target.value);
                          }}
                        />
                      )}
                      <div className="absolute bottom-2 right-2 cursor-pointer">
                        <img
                          src="/ai.svg"
                          alt="ai icon"
                          onClick={() => generateExample(showWord)}
                        />
                      </div>
                    </div>
                  </label>
                </Flex>
                <div className="mt-3 w-full" onClick={() => setIsOpen(false)}>
                  <Flex justify="end" gap="5">
                    <Button size="3" onClick={() => addDefinition()}>
                      OK
                    </Button>
                  </Flex>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </form>
      </div>
    </div>
  );
};
