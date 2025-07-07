import { Progress, Badge, TextArea, Button, Box } from "@radix-ui/themes";

export const PracticeArea = () => {
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
        <div className="flex justify-start gap-8 items-center">
          <h2 className="text-3xl font-bold">Despite</h2>
          <Badge size="2">Easy</Badge>
        </div>
        <div className="py-3">
          <p className="italic">
            without taking any notice of or being influenced by; not prevented
            by
          </p>
        </div>
        <hr className="mb-8" />

        <div>
          <h3 className="pb-3 font-medium">
            Write a sentence using 'Despite'
          </h3>
          <div className="pb-2">
            <TextArea
              placeholder="Write your sentence here..."
              resize="vertical"
              size="2"
            />
          </div>
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
};
