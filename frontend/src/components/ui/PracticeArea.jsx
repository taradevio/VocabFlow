import { toast } from "sonner";
import {
  Progress,
  Badge,
  TextArea,
  Button,
  Flex,
  Spinner,
} from "@radix-ui/themes";
import {
  useMutation,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { PracticeContext } from "../../context/PracticeContext";
import { useContext, useEffect, useState } from "react";

const queryClient = new QueryClient();

export function PracticeArea() {
  return (
    <QueryClientProvider client={queryClient}>
      <GeneratePracticeArea />
    </QueryClientProvider>
  );
}

const GeneratePracticeArea = () => {
  const { selectedDifficulty, words, isShuffle } = useContext(PracticeContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShuffled, setIsShuffled] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [AIAnswer, setAIAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // useEffect(() => {
  //   if (words) {
  //     words[wordIndex];
  //   }
  // }, []);

  const currentWord = words[wordIndex];

  // console.log(currentWord.word);

  // function handleSubmit() {
  //   setSubmitLoading(true);
  //   setTimeout(() => {
  //     setShowAnswer(answer);
  //     setIsSubmit(true);
  //     setAnswer("");
  //     setSubmitLoading(false);
  //   }, 1000);
  // }

  function handleNext() {
    setWordIndex((prev) => prev + 1);
    setIsSubmit(false);
    setAIAnswer("")
    setUserAnswer("")
  }

  // const { mutate: generateWritingPrompt } = useMutation({
  //   mutationFn: async (sentence) => {
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
  //             content: `You are an expert English teacher and writing assistant. Given the following sentence written by a learner, do the following: Correct the sentence for grammar, punctuation, and clarity. If it's a creative writing sentence (like a story or imaginative expression), preserve the original style and tone while still correcting errors appropriately. Briefly explain the correction in simple, beginner-friendly English (no technical jargon). If there is no error, briefly explain why there is no error. Sentence to correct: ${sentence}. `,
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
  //               setAIAnswer((prev) => prev + content);
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
  //     setSubmitLoading(true);
  //     setAIAnswer("");
  //   },
  //   onSuccess: () => {
  //     setSubmitLoading(false);
  //     setIsSubmit(true)
  //     toast.success("Feedback sucessfully generated!");
  //   },
  //   onError: (err) => {
  //     toast.error("Failed fetching:", err);
  //     console.log("Failed to fetch definition");
  //   },
  // });

  return (
    <div className="ps-5 pe-5">
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="font-medium">Question {wordIndex + 1} of {words.length}</p>
          <p>Practice Session</p>
        </div>
        <div className="py-2">
          <Progress value={((wordIndex + 1) / words.length) * 100} color="crimson" />
        </div>
      </div>

      <div className="border-1 rounded-md p-5 mt-5">
        {/* {selectedDifficulty.includes("Beginner") ? (
          // filter if users click difficulty beginner, it will show beginner only label
          words.filter((word) => word.difficulty === "Beginner").map((item, index) => (
            <div key={index}>
              <div className="flex justify-start gap-8 items-center">
                <h2 className="text-3xl font-bold">{item.word}</h2>
                <Badge size="2">{item.difficulty}</Badge>
              </div>
              <div className="py-3">
                <p className="italic">{item.definition}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-start gap-8 items-center">
            <h2 className="text-3xl font-bold">
              this is supposed to be like this
            </h2>
            <Badge size="2">Easy</Badge>
          </div>
        )} */}

        {isShuffle ? (
          currentWord ? (
            <div>
              <div className="flex justify-start gap-8 items-center">
                <h2 className="text-3xl font-bold">{currentWord.word}</h2>
                <Badge size="2">{currentWord.difficulty}</Badge>
              </div>
              <div className="py-3">
                <p className="italic">{currentWord.definition}</p>
              </div>
            </div>
          ) : null
        ) : (
          <div>
            <div className="flex justify-start gap-8 items-center">
              <h2 className="text-3xl font-bold">{currentWord.word}</h2>
              <Badge size="2">{currentWord.difficulty}</Badge>
            </div>
            <div className="py-3">
              <p className="italic">{currentWord.definition}</p>
            </div>
          </div>
        )}

        <hr className="mb-8" />

        <div>
          <h3 className="pb-3 font-medium">
            Write a sentence using "{currentWord.word}"
          </h3>
          <div className="pb-2">
            <TextArea
              placeholder="Write your sentence here..."
              resize="vertical"
              size="2"
              onChange={(e) => setUserAnswer(e.target.value)}
              value={userAnswer}
              disabled={isSubmit}
            />
          </div>
        </div>
        <Flex justify="end" gap="3">
          {submitLoading ? (
            <Spinner />
          ) : (
            <Button
              onClick={() => setIsSubmit(!isSubmit)}
              disabled={isSubmit}
            >
              Submit
            </Button>
          )}
          {/* if issubmit is true and wordindex is less than the contained words, show button */}
          {isSubmit && wordIndex < words.length - 1 && (
            <div>
              <Button onClick={() => handleNext()}>Next</Button>
            </div>
          )}
        </Flex>
      </div>

      {AIAnswer && (
        <div className="my-5">
          <div>
            <h3>Feedback</h3>
            <p>{AIAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
};
