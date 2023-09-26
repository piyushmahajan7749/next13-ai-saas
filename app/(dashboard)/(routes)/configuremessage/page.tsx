"use client";

import { toast } from "react-hot-toast";

import {
  Card,
  Flex,
  TextArea,
  TextField,
  Callout,
  Button,
  Tabs,
} from "@radix-ui/themes";

import { useRef, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/loader";

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

const ConfigureMessage: React.FC<{
  selectedAudience: any;
  setActiveStep: (value: any) => void;
}> = ({ selectedAudience, setActiveStep }) => {
  const [scriptPersonalizerText, setScriptPersonalizerText] = useState("");
  const [aiGeneratorText, setAiGeneratorText] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [variables, setVariables] = useState([
    { label: "Name", value: selectedAudience?.users[0].name },
    { label: "Bio", value: selectedAudience?.users[0].description },
  ]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderCompany, setSenderCompany] = useState("");
  const [isAiLoading, setAiLoading] = useState(false);

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

  const generateAiMesage = async () => {
    setAiLoading(true);
    try {
      const response = await axios.post("/api/aimessage", [
        senderName,
        senderCompany,
        selectedAudience?.users[0].name,
        selectedAudience?.users[0].description,
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
    <Card mb="8">
      <Callout.Root className="mx-4 my-4">
        <Callout.Text className="text-6xl font-bold">
          2. Configure Message for {selectedAudience?.name}
        </Callout.Text>
      </Callout.Root>

      <Tabs.Root defaultValue="script">
        <Tabs.List>
          <Tabs.Trigger value="script">Script Personalizer</Tabs.Trigger>
          <Tabs.Trigger value="ai">AI Generator</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="script">
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

        <Tabs.Content value="ai">
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
        className="m-4 col-span-12 lg:col-span-2 w-full"
        onClick={setActiveStep}
        style={{ width: 120 }}
      >
        Next
      </Button>
    </Card>
  );
};

export default ConfigureMessage;
