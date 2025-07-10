import {
  Switch,
  Checkbox,
  Button,
  Tooltip,
  RadioCards,
  Text,
  Flex,
} from "@radix-ui/themes";
import {
  useMutation,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router";
import { PracticeContext } from "../../context/PracticeContext";
// use usenavigate when you want to move to another page, but to move there, it needs to be wrapped inside a logic, like function, onclick, etc
import { useNavigate } from "react-router";

const queryClient = new QueryClient();

export function Practice() {
  return (
    <QueryClientProvider client={queryClient}>
      <GeneratePractice />
    </QueryClientProvider>
  );
}

const GeneratePractice = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isEasy, setIsEasy] = useState(false);
  // const [isMedium, setIsMedium] = useState(false);
  // const [isHard, setIsHard] = useState(false);
  // const [isShuffle, setIsShuffle] = useState(false);
  const [isValue, setSelectedValue] = useState(0);

  // use usenavigate to move to another page
  const navigate = useNavigate();

  const {
    setWords,
    words,
    selectedDifficulty,
    setSelectedDifficulty,
    isShuffle,
    setIsShuffle,
  } = useContext(PracticeContext);

  const getWords = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(words);
  }, [words]);

  const filteredWords = getWords.filter((word) =>
    selectedDifficulty.includes(word.difficulty)
  );
  const shuffle = [...filteredWords].sort(() => Math.random() - 0.5);

  // const { mutate: generateWritingPrompt } = useMutation({
  //   mutationFn: async (word) => {
  //     const response = await fetch("http://127.0.0.1:8787/api/openrouter", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         // the structure below has to be the same as defined in openrouter
  //         messages: [
  //           {
  //             role: "user",
  //             content: `Analyze the word ${words}. `,
  //           },
  //         ],
  //       }),
  //     });

  //     const reader = response.body?.getReader();
  //     if (!reader) {
  //       console.error("No reader found on response");
  //       throw new Error("No response body");
  //     }
  //     const decoder = new TextDecoder();
  //     let buffer = "";
  //     let result = "";

  //     while (true) {
  //       const { done, value } = await reader.read();
  //       if (done) break;

  //       buffer += decoder.decode(value, { stream: true });

  //       let lineEnd;
  //       while ((lineEnd = buffer.indexOf("\n")) !== -1) {
  //         const line = buffer.slice(0, lineEnd).trim();
  //         buffer = buffer.slice(lineEnd + 1);

  //         if (line.startsWith("data: ")) {
  //           const json = line.slice(6);
  //           if (json === "[DONE]") break;

  //           try {
  //             const parsed = JSON.parse(json);
  //             const content = parsed.choices?.[0]?.delta?.content;
  //             if (content) {
  //               result += content;
  //               // below is called batching in react
  //               setDefinition((prev) => prev + content);
  //             }
  //           } catch (err) {
  //             console.warn("Failed to parse chunk:", err);
  //           }
  //         }
  //       }
  //     }

  //     return result;
  //   },
  //   onMutate: () => {
  //     setIsLoadingPartsOfSpeech(true);
  //     setPartsOfSpeech("");
  //   },
  //   onSuccess: () => {
  //     setIsLoadingPartsOfSpeech(false);
  //     console.log("Parts of Speech sucessfully generated!");
  //   },
  //   onError: (err) => {
  //     console.error("Failed fetching:", err);
  //     console.log("Failed to fetch definition");
  //   },
  // });

  // async function startPractice() {
  //   const getWritingPrompt = await generateWritingPrompt();
  //   setIsLoading(true);
  //   setWords(shuffle);
  //   setTimeout(() => {
  //     // call navigate to practice area. the practice area below is the name of the endpoint created in main.jsx
  //     navigate("practice-area");
  //     setIsLoading(false);
  //   }, 1000);
  // }

  return (
    <div className="rounded-md p-5">
      <div className="">
        <h2 className="font-semibold text-2xl">Practice Settings</h2>
        <p className="text-sm">Choose which words to practice and how many</p>
      </div>

      {/* difficulty levels */}
      <div className="mt-5">
        <div className="flex gap-1">
          <h3 className="font-semibold text-md">Difficulty level</h3>
          <Tooltip content="Based on words' difficulty">
            <img src="/information.svg" alt="information icon" />
          </Tooltip>
        </div>

        <form>
          <div className="flex flex-wrap justify-around items-center p-1 gap-5">
            <div className="flex items-center gap-1">
              {/* use checked to check if the value contains the given value e. g beginner. if it exists, the set the difficulty to (existing value (if any), and beginner itself). If the checkbox is unclicked, it will filter out */}
              <Checkbox
                checked={selectedDifficulty.includes("Beginner")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDifficulty([...selectedDifficulty, "Beginner"]);
                  } else {
                    setSelectedDifficulty(
                      selectedDifficulty.filter((item) => item !== "Beginner")
                    );
                  }
                }}
                value="Beginner"
              />
              <label>Beginner</label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                checked={selectedDifficulty.includes("Intermediate")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDifficulty([
                      ...selectedDifficulty,
                      "Intermediate",
                    ]);
                  } else {
                    setSelectedDifficulty(
                      selectedDifficulty.filter(
                        (item) => item !== "Intermediate"
                      )
                    );
                  }
                }}
                value="Intermediate"
              />
              <label>Intermediate</label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                checked={selectedDifficulty.includes("Advanced")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedDifficulty([...selectedDifficulty, "Advanced"]);
                  } else {
                    setSelectedDifficulty(
                      selectedDifficulty.filter((item) => item !== "Advanced")
                    );
                  }
                }}
                value="Advanced"
              />
              <label>Advanced</label>
            </div>
          </div>
        </form>
      </div>

      {/* number of words will only appear if words are more than 5 and multiplication of 5 e. g 10, 15, 20, else, just null it*/}
      {getWords.length < 5 ? null : (
        <div className="mt-5">
          <h3 className="font-semibold text-md">Number of words</h3>
          <p className="text-sm">Number of words you want to practice</p>
          <div className="flex gap-5 pt-3">
            <RadioCards.Root
              size="1"
              onValueChange={(value) => setSelectedValue(value)}
            >
              <Flex gap="3">
                <RadioCards.Item value="5">
                  <Text>5</Text>
                </RadioCards.Item>
                <RadioCards.Item value="10">
                  <Text>10</Text>
                </RadioCards.Item>
                <RadioCards.Item value="15">
                  <Text>15</Text>
                </RadioCards.Item>
              </Flex>
            </RadioCards.Root>
          </div>
        </div>
      )}

      {/* prioritise words */}
      <div className="flex items-center gap-2 mt-5">
        <Switch />
        <p className="text-sm">Prioritize unpracticed words</p>
      </div>

      {/* shuffle words */}
      <div className="flex items-center gap-2 mt-5">
        <Switch onCheckedChange={() => setIsShuffle(!isShuffle)} />
        <p className="text-sm">Shuffle word order</p>
      </div>

      <hr className="mt-5" />

      <div className="flex justify-end mt-5 w-full">
        {/* when users click the start practice, ai will generate the prompt of what the users should write in the practice area */}
        <Button
          onClick={() => {
            setIsLoading(true);
            setWords(shuffle);
            setTimeout(() => {
              // call navigate to practice area. the practice area below is the name of the endpoint created in main.jsx
              navigate("practice-area");
              setIsLoading(false);
            }, 1000);
          }}
          loading={isLoading}
        >
          Start Practice
        </Button>
      </div>

      <Outlet />
    </div>
  );
};
