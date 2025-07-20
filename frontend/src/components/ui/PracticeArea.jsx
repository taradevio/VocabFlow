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
import ConfettiExplosion from "react-confetti-explosion";
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
  const { selectedDifficulty, words, isShuffle, setWords } =
    useContext(PracticeContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShuffled, setIsShuffled] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [AIAnswer, setAIAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
    setAIAnswer("");
    setUserAnswer("");
  }

  function handleFinish() {
    setIsFinish(true);
    setTimeout(() => {
      setShowConfetti(true);
    }, 500);
  }

  const { mutate: generateFeedback } = useMutation({
    mutationFn: async (sentence) => {
      const response = await fetch("http://127.0.0.1:8787/api/openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // the structure below has to be the same as defined in openrouter
          messages: [
            {
              role: "user",
              content: `Please evaluate ${sentence} for grammar, clarity, and overall coherence. If it is already grammatically correct, cohesive, and clear, return it as-is and include a short, easy-to-understand explanation stating that no edits are needed If there are grammar mistakes, return an easy-to-understand explanation as if you were explaining to a person who has just learned English. If it can be improved (e.g., awkward phrasing, redundancy, grammar mistakes, or lack of clarity), provide:
              
              A corrected version of the sentence,
              A clear and helpful explanation written in the style of an IELTS writing examiner: 
                Professional but understandable,
                Explains improvements in terms of grammar, coherence, conciseness, or fluency,
                Avoids first-person ("I") and uses neutral academic tone
                
              Format:
              Corrected sentence (if applicable): 
              [your corrected sentence]
              
              Explanation:
              [short explanation in IELTS-style]
              
              If the sentence is fine:
              Correct sentence:
              [same sentence]
              
              Explanation:
              [explain that no revision is needed + why the sentence works] 
              
              return all the explanation in Indonesian language.
              `,
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
                setAIAnswer((prev) => prev + content);
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
      setSubmitLoading(true);
      setIsSubmit(true);
    },
    onSuccess: () => {
      setSubmitLoading(false);
      // get words taken right from local instead of using words from context
      // const getData = JSON.parse(localStorage.getItem("user") || "[]");
      // const updateIsPractice = getData.map((word) => {
      //   if (word.word === currentWord.word) {
      //     return {
      //       ...word,
      //       is_practiced: true,
      //     };
      //   } else {
      //     return word;
      //   }
      // });

      // localStorage.setItem("user", JSON.stringify(updateIsPractice));
      // setWords(updateIsPractice);
      toast.success("Feedback sucessfully generated!");
    },
    onError: (err) => {
      toast.error("Failed fetching:", err);
      console.log("Failed to fetch definition");
    },
  });

  // if now words are found in the difficulty return error so that users wont proceed to the practice area

  return (
    <div className="ps-5 pe-5">
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="font-medium">
            Question {wordIndex + 1} of {words.length}
          </p>
          <p>Practice Session</p>
        </div>
        <div className="py-2">
          <Progress
            value={((wordIndex + 1) / words.length) * 100}
            color="crimson"
          />
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
              onClick={() => generateFeedback(userAnswer)}
              // onClick={() => setIsSubmit(!isSubmit)}
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

          {isSubmit && wordIndex === words.length - 1 && (
            <div>
              <Button
                onClick={() => {
                  handleFinish();
                }}
              >
                Finish
              </Button>
            </div>
          )}
        </Flex>
      </div>

      {showConfetti && (
        <div className="absolute top-0 left-0 w-screen h-screen pointer-events-none items-center z-50 flex justify-center">
          <ConfettiExplosion
            width={800}
            particleCount={250}
            force={0.8}
            height={window.innerHeight}
          />
        </div>
      )}

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
