"use client";

import { toast } from "react-hot-toast";
import { LucideBadgeDollarSign, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

import {
  Card,
  Container,
  Flex,
  Grid,
  TextArea,
  Text,
  Box,
  TextField,
  Select,
} from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";

import { Label } from "@radix-ui/react-label";
import { FC, useEffect, useRef, useState } from "react";
import { Audience, ScheduleMessageProps } from "../automation/constants";

const ScheduleMessage: FC<ScheduleMessageProps> = ({ audience }) => {
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
    <Container size="4" className="px-4 lg:px-8">
      <Card my="4" className="p-4 rounded-lg shadow-lg">
        <Grid gap="3">
          <Label className="text-lg font-bold">
            Schedule Messages for {audience?.name}
          </Label>
        </Grid>
      </Card>
      <Card my="4" className="p-4 rounded-lg shadow-lg">
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
      </Card>
      <Button
        className="col-span-12 lg:col-span-2 w-full mt-4 bg-green-500 text-white rounded"
        style={{ width: 180 }}
      >
        Start Automation
      </Button>
    </Container>
  );
};

export default ScheduleMessage;
