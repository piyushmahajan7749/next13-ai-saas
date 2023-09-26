"use client";

import { Card, TextField, Select, Callout, Button } from "@radix-ui/themes";

import { useState } from "react";

const ScheduleMessage: React.FC<{
  audience: any;
  setActiveStep: (value: any) => void;
}> = ({ audience, setActiveStep }) => {
  const [inputValue, setInputValue] = useState<string>("50");
  const [selectValue, setSelectValue] = useState<string>("day");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectValue(value);
  };
  return (
    <Card mb="8">
      <Callout.Root className="mx-4 my-4">
        <Callout.Text className="text-6xl font-bold">
          3. Schedule Messages for {audience?.name}
        </Callout.Text>
      </Callout.Root>

      <div className="flex items-center px-4">
        <span>Show </span>
        <TextField.Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="p-1 px-2 rounded w-16 mx-1 text-center"
        />
        <span>messages per </span>

        <Select.Root>
          <Select.Trigger />
          <Select.Content position="popper">
            <Select.Item value="day">Day</Select.Item>
            <Select.Item value="week">Week</Select.Item>
            <Select.Item value="month">Month</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
      <Button
        className="m-4 col-span-12 lg:col-span-2 w-full"
        onClick={setActiveStep}
        style={{ width: 200 }}
      >
        Start Automation
      </Button>
    </Card>
  );
};

export default ScheduleMessage;
