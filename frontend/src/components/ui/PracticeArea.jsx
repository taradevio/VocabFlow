import {
  Progress,
  Badge,
  TextArea,
  Button,
  Flex,
  Spinner,
} from "@radix-ui/themes";
import { PracticeContext } from "../../context/PracticeContext";
import { useContext, useEffect, useState } from "react";
export const PracticeArea = () => {
  const { selectedDifficulty, words, isShuffle } = useContext(PracticeContext);
  const [wordIndex, setWordIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShuffled, setIsShuffled] = useState([]);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // useEffect(() => {
  //   if (words) {
  //     words[wordIndex];
  //   }
  // }, []);

  const currentWord = words[wordIndex];

  // console.log(currentWord.word);

  function handleSubmit() {
    setSubmitLoading(true);
    setTimeout(() => {
      setShowAnswer(answer);
      setIsSubmit(true);
      setAnswer("");
      setSubmitLoading(false)
    }, 1000);
  }

  function handleNext() {
    setWordIndex((prev) => prev + 1);
    setIsSubmit(false);
    setShowAnswer("");
  }

  return (
    <div className="ps-5 pe-5 ">
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="font-medium">Question 1 of 5</p>
          <p>Practice Session</p>
        </div>
        <div className="py-2">
          <Progress value={5} color="crimson" />
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
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              disabled={isSubmit}
            />
          </div>
        </div>
        <Flex justify="end" gap="3">
          {submitLoading ? (
            <Spinner />
          ) : (
            <Button onClick={() => handleSubmit()} disabled={isSubmit}>Submit</Button>
          )}
          {/* if issubmit is true and wordindex is less than the contained words, show button */}
          {isSubmit && wordIndex < words.length - 1 && (
            <div>
              <Button onClick={() => handleNext()}>Next</Button>
            </div>
          )}
        </Flex>
      </div>
      {showAnswer && <p>{showAnswer}</p>}
    </div>
  );
};
