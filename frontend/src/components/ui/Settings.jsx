import { Switch, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "@radix-ui/themes";

export const Settings = () => {
  const [isActive, setIsActve] = useState(false);

  return (
    <div className="h-dvh p-5">
      <h2 className="text-3xl font-bold">Settings</h2>
      <p className="text-sm">Customize your vocabulary practice experience</p>
      <div className="mt-5 p-5 border-1 rounded-md max-w-md">
        <div className="">
          <h3 className="font-semibold">🔔 Email Notification</h3>
          <p className="text-sm">Receive practice reminders via email</p>
          {/* email reminder */}
          <div className="mt-5 flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-md">Email Reminder</h4>
              <p className="text-sm">
                Get reminders sent to your email address
              </p>
            </div>
            <div>
              <Switch onClick={() => setIsActve(!isActive)} />
            </div>
          </div>

          {isActive && (
            <>
              <div className="mt-5">
                <h4 className="font-semibold text-md">Email Address</h4>
                <TextField.Root placeholder="your.email@address.com"></TextField.Root>
              </div>
              <p className="mt-3 text-sm">
                We'll send gentle reminders to help you stay consistent
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
