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
} from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";

import { Label } from "@radix-ui/react-label";
import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/loader";
import ScheduleMessage from "../schedulemessage/page";
import { Audience, ConfigureMessageProps } from "../automation/constants";

type VariableChipProps = {
  label: string;
  value: string;
  onClick: (label: string) => void;
};

const VariableChip: React.FC<VariableChipProps> = ({
  label,
  value,
  onClick,
}) => {
  return (
    <button
      className="bg-blue-500 text-white rounded-full px-4 py-1 mr-2"
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};

const ConfigureMessage: React.FC<ConfigureMessageProps> = ({ audience }) => {
  const [scriptPersonalizerText, setScriptPersonalizerText] = useState("");
  const [aiGeneratorText, setAiGeneratorText] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [variables, setVariables] = useState([
    { label: "Name", value: audience?.users[0].name },
    { label: "Bio", value: audience?.users[0].description },
  ]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderCompany, setSenderCompany] = useState("");
  const [isAiLoading, setAiLoading] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);

  const handleVariableClick = (variableValue: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = scriptPersonalizerText.substring(0, start);
    const after = scriptPersonalizerText.substring(end);

    // Insert the variable at the current cursor position
    const newText = `${before}${variableValue}${after}`;
    setScriptPersonalizerText(newText);

    // Place the cursor after the inserted variable
    const newCursorPos = start + variableValue.length + 4; // 4 for the two sets of curly braces
    setTimeout(() => {
      textarea.selectionStart = newCursorPos;
      textarea.selectionEnd = newCursorPos;
    }, 0);
  };

  const handleAddCustomVariable = () => {
    setVariables([...variables, { label: customLabel, value: customValue }]);
    setCustomLabel("");
    setCustomValue("");
    setShowCustomInput(false);
  };

  // Handlers to update text area values
  const handleScriptPersonalizerChange = (e: any) => {
    setScriptPersonalizerText(e.target.value);
  };

  const handleNextClick = async (e: React.FormEvent) => {
    setShowScheduling(true);
  };

  const generateAiMesage = async () => {
    setAiLoading(true);
    try {
      const response = await axios.post("/api/aimessage", [
        senderName,
        senderCompany,
        audience?.users[0].name,
        audience?.users[0].description,
      ]);
      setAiGeneratorText(response.data.content);
      setAiLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 403) {
      } else {
        toast.error("Something went wrong.");
      }
      setAiLoading(false);
    }
  };

  return (
    <Container size="4" className="px-4 lg:px-8">
      {!showScheduling ? (
        <Box>
          <Card my="4" className="p-4 rounded-lg shadow-lg">
            <Grid gap="3">
              <Label className="text-lg font-bold">
                Configure Message for {audience?.name}
              </Label>
            </Grid>
          </Card>
          {/* Tabs Component */}
          <Tabs.Root className="mt-4" defaultValue="script">
            <Tabs.List className="flex border-b">
              <Tabs.Trigger
                value="script"
                className="px-4 py-2 cursor-pointer"
                data-state="closed"
              >
                Script Personalizer
              </Tabs.Trigger>
              <Tabs.Trigger
                value="ai"
                className="px-4 py-2 cursor-pointer"
                data-state="closed"
              >
                AI Generator
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="script" className="mt-4">
              <Flex direction="column">
                <div className="mb-4">
                  {variables.map((variable, i) => (
                    <VariableChip
                      key={i}
                      label={variable.label}
                      value={variable.value || ""}
                      onClick={handleVariableClick}
                    />
                  ))}
                  <button
                    className="bg-green-500 text-white rounded-full px-4 py-1 mr-2"
                    onClick={() => setShowCustomInput(true)}
                  >
                    +
                  </button>
                </div>
                {showCustomInput && (
                  <div className="flex items-center mb-4 space-x-2">
                    <TextField.Input
                      type="text"
                      className=" p-2"
                      placeholder="Label"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                    />
                    <TextField.Input
                      type="text"
                      className=" p-2"
                      placeholder="Value"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white rounded px-4 py-2"
                      onClick={handleAddCustomVariable}
                    >
                      Add
                    </button>
                  </div>
                )}
                <Flex>
                  <TextArea
                    className="w-1/2 p-2 border rounded"
                    placeholder="Write your personalized script here..."
                    ref={textAreaRef}
                    value={scriptPersonalizerText}
                    rows={12}
                    onChange={handleScriptPersonalizerChange}
                  />
                  <div className="w-1/2 p-4 border rounded ml-4">
                    <h3>Preview:</h3>
                    <p>{scriptPersonalizerText}</p>
                  </div>
                </Flex>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="ai" className="mt-4 flex">
              <div className="w-1/2 items-center mb-4 space-x-2">
                {isAiLoading ? (
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                  </div>
                ) : (
                  <Flex direction="column" gap="3">
                    <TextField.Input
                      type="text"
                      className="p-2"
                      placeholder="add your name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                    />
                    <TextField.Input
                      type="text"
                      className="p-2"
                      placeholder="add your company name"
                      value={senderCompany}
                      onChange={(e) => setSenderCompany(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white rounded px-4 py-2"
                      onClick={generateAiMesage}
                    >
                      Generate Preview
                    </button>
                  </Flex>
                )}
              </div>
              <div className="w-1/2 p-4 border rounded ml-4">
                <h3>Preview:</h3>
                <p>{aiGeneratorText}</p>
              </div>
            </Tabs.Content>
          </Tabs.Root>
          <Button
            className="col-span-12 lg:col-span-2 w-full mt-4 bg-green-500 text-white rounded"
            style={{ width: 120 }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      ) : (
        <ScheduleMessage audience={audience} />
      )}
    </Container>
  );
};

export default ConfigureMessage;
