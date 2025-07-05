import { Switch, Checkbox, Button, Tooltip } from "@radix-ui/themes";
import { useState } from "react";

export const Practice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEasy, setIsEasy] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isHard, setIsHard] = useState(false);

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
          <div className="flex justify-around items-center p-1 gap-5">
            <div className="flex items-center gap-1">
              <Checkbox
                onCheckedChange={(checked) => {
                  setIsEasy(checked);
                }}
                checked={isEasy}
              />
              <label>Beginner</label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                onCheckedChange={(checked) => {
                  setIsMedium(checked);
                }}
                checked={isMedium}
              />
              <label>Intermediate</label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                onCheckedChange={(checked) => {
                  setIsHard(checked);
                }}
                checked={isHard}
              />
              <label>Advanced</label>
            </div>
          </div>
        </form>
      </div>

      {/* number of words will only appear if words are more than 5 and multiplication of 5 e. g 10, 15, 20, else, just null it*/}
      <div className="mt-5">
        <h3 className="font-semibold text-md">Number of words</h3>
        <p className="text-sm">Number of words you want to practice</p>
        <div className="flex gap-5 pt-3">
          <Button>5</Button>
          <Button>10</Button>
          <Button>15</Button>
        </div>
      </div>

      {/* prioritise words */}
      <div className="flex items-center gap-2 mt-5">
        <Switch />
        <p className="text-sm">Prioritize unpracticed words</p>
      </div>

      {/* shuffle words */}
      <div className="flex items-center gap-2 mt-5">
        <Switch />
        <p className="text-sm">Shuffle word order</p>
      </div>

      <hr className="mt-5" />

      <div className="flex justify-between gap-2 mt-5 w-full">
        <Button>Cancel</Button>

        <Button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }}
          loading={isLoading}
        >
          Start Practice
        </Button>
      </div>
    </div>
  );
};
