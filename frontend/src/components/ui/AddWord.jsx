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
  const [difficulty, setDifficulty] = useState("");
  const [partsOfSpeech, setPartsOfSpeech] = useState("");
  const [isLoadingDifficulty, setIsLoadingDifficulty] = useState(false);
  const [isLoadingPartsOfSpeech, setIsLoadingPartsOfSpeech] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);

  useEffect(() => {
    // on mount check local storage and get the words
    const getItems = JSON.parse(localStorage.getItem("user")) || [];
    setWordBank(getItems);
  }, []);

  // generate difficulty
  const { mutateAsync: generateDifficulty } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("https://vocab.nandayavanets.workers.dev/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          messages: [
            {
              role: "user",
              content: `"Analyze the word '${word}' and classify its difficulty level for ESL learners. Return ONLY one of: Beginner, Intermediate, Advanced. Use these rules: 1.Beginner: Common words used in daily conversation, 2.Intermediate: Less common but used in academic or professional contexts, 3.Advanced: Rare, literary, or formal vocabulary not used in casual speech."`,
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
              }
            } catch (err) {
              console.warn("Failed to parse chunk:", err);
            }
          }
        }
      }

      return result.trim();
    },
    onMutate: () => {
      setIsLoadingDifficulty(true);
      setDifficulty("");
    },
    onSuccess: () => {
      setIsLoadingDifficulty(false);
      toast.success("Difficulty sucessfully generated!");
    },
    onError: (err) => {
      console.error("Failed fetching:", err);
      toast.error("Failed to fetch definition");
    },
  });

  // generate parts of speech
  const { mutateAsync: generatePartsOfSpeech } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("https://vocab.nandayavanets.workers.dev/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          messages: [
            {
              role: "user",
              content: `Analyze the word ${word}. Return its part(s) of speech based on common modern usage.If the word has only one common part of speech, return just that. If it has multiple equally common parts of speech, return all of them with a comma. Do not include definitions or explanations. There are 8 parts of speech: verb, noun, pronoun, adjective, adverb, preposition, conjunction, or interjection.`,
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
              }
            } catch (err) {
              console.warn("Failed to parse chunk:", err);
            }
          }
        }
      }

      return result.trim();
    },
    onMutate: () => {
      setIsLoadingPartsOfSpeech(true);
      setPartsOfSpeech("");
    },
    onSuccess: () => {
      setIsLoadingPartsOfSpeech(false);
      toast.success("Parts of Speech sucessfully generated!");
    },
    onError: (err) => {
      console.error("Failed fetching:", err);
      toast.error("Failed to fetch definition");
    },
  });

  // mutation for definition
  const { mutate: generateDefinition } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("https://vocab.nandayavanets.workers.dev/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          messages: [
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

  // generate example
  const { mutate: generateExample } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("https://vocab.nandayavanets.workers.dev/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          messages: [
            {
              role: "user",
              content: `You are an academic English assistant. Given the word '${word}', return only its part(s) of speech and one example sentence for each part of speech in a clear bullet list. Do not include any explanations, formatting symbols (like * or >), definitions, or greetings. Only output the list. Be precise and factual. If the word has only one part of speech, list only that.`,
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

  // validate if no words are not found
  const { mutateAsync: validateWord } = useMutation({
    mutationFn: async (word) => {
      const response = await fetch("https://vocab.nandayavanets.workers.dev/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          messages: [
            {
              role: "user",
              content: `You are an academic-level English word analyzer. Given the word '${word}', perform the following: If the word is not recognized in English (i.e., a random string or non-existent word), return only: undefined (no quotes, no explanation, no formatting). If the word appears to be a typo of a real English word, return only the corrected spelling. Do not explain or elaborate. Return just the corrected word. Do not return anything else. Do not include formatting, explanations, or metadata. Return only the expected value based on the rules above.`,
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
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (err) => {
      console.error("Failed fetching:", err);
      toast.error("Failed to fetch example");
    },
  });

  async function addWord() {
    try {
      // get input as a source
      const getUserData = word.trim().toLowerCase();

      // check if userStructure is empty
      if (!getUserData) {
        setIsLoading(true);
        setTimeout(() => {
          toast.error("Cannot be  empty!");
          setIsOpen(false);
          setIsLoading(false);
        }, 200);
        return;
      }
      // validate the inputted word
      const validate = await validateWord(getUserData);
      // if the returned validation is equivalent to undefined which is the result of the prompt, then dont show the dialog as the open state is false and return toast error and just return
      if (validate.trim().toLowerCase() === "undefined") {
        setIsOpen(false);
        toast.error("Word you entered is not found");
        return;
      }
      // else if it's not a random word, then set the showWord by using the inputted word
      setShowWord(validate.toLocaleLowerCase());
      // add object structure
      const userStructure = {
        word: validate.toLocaleLowerCase(),
        definition: "",
        added_on: new Date().toLocaleDateString(),
        is_practiced: false,
        last_practiced: null,
        example: "",
      };

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
    } catch (error) {
      console.error("error adding new word", error);
    }
  }

  async function addDefinition() {
    try {
      // i think we can just directly use word state instead of using showword state
      const addDifficulty = await generateDifficulty(showWord);
      const addPartsOfSpeech = await generatePartsOfSpeech(showWord);
      // get the words from words stored in array
      const getWordBank = [...wordBank];
      // map the array, then if the current word matches with the word stored, return the existing word and add definition generated by AI saved inside definition state
      const update = getWordBank.map((word) => {
        if (word.word === showWord) {
          return {
            ...word,
            definition: definition,
            example: example,
            difficulty: addDifficulty.trim(),
            partsOfSpeech: addPartsOfSpeech.trim(),
          };
        } else {
          return word;
        }
      });

      // update the word bank
      setWordBank(update);
      setDefinition("");
      setExample("");
      // update the local storage
      localStorage.setItem("user", JSON.stringify(update));
      toast.success("Definition and example added successfully!");
    } catch (error) {
      console.error("error creating metadata", error);
    }

    // if the word is random and not found in english, return undefined in the output of definition, then when users click ok, the logic needs to match if the value inside the input of definition is undefined. If it is, the users won't be able to save
  }

  return (
    <div className="sm:grid sm:place-content-center sm:h-dvh relative">
      <div className="border-2 p-10 text-center w-fit sm:w-3xl rounded-md">
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
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              {/* need a condition in which it shows error or words cannot be found if users enter random words that can't be found in English */}
              <Button
                className="mt-3"
                onClick={() => addWord()}
                loading={isLoading}
              >
                Add Word
              </Button>
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
                      <TextArea
                        placeholder="Add the word's definition manually or generate with AI"
                        value={definition}
                        resize="vertical"
                        onChange={(e) => {
                          setDefinition(e.target.value);
                        }}
                      />

                      <div className="absolute bottom-2 right-2 cursor-pointer">
                        {isLoadingDefinition ? (
                          <Spinner />
                        ) : (
                          <img
                            src="/ai.svg"
                            alt="ai icon"
                            onClick={() => generateDefinition(showWord)}
                          />
                        )}
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
                      <TextArea
                        placeholder="Enter an example manually or generate with AI"
                        value={example}
                        resize="vertical"
                        onChange={(e) => {
                          setExample(e.target.value);
                        }}
                      />
                      <div className="absolute bottom-2 right-2 cursor-pointer">
                        {isLoadingExample ? (
                          <Spinner />
                        ) : (
                          <img
                            src="/ai.svg"
                            alt="ai icon"
                            onClick={() => generateExample(showWord)}
                          />
                        )}
                      </div>
                    </div>
                  </label>
                </Flex>

                <div className="mt-3 w-full">
                  <Flex justify="end" gap="5">
                    <Button
                      size="3"
                      onClick={async () => {
                        setFinalLoading(true);
                        await addDefinition();
                        setFinalLoading(false);
                        setIsOpen(false);
                      }}
                    >
                      {finalLoading ? <Spinner /> : "OK"}
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
