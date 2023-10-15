// Assuming "use client" is a comment
// use client;

import { userPrompt } from "@/app/constants/strings";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import {
  Button,
  Callout,
  Card,
  Container,
  Flex,
  TextArea,
} from "@radix-ui/themes";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NextSteps from "./nextsteps";

interface QuestionProps {
  text: string;
  options: string[]; // or whatever type your options should be
}

interface FormData {
  // ...define the shape of formData
}

interface Message {
  content: string;
  role: string;
  // ...any other fields
}

interface ScreenerResultsProps {
  formData: FormData;
  messages: ChatCompletionRequestMessage[];
}

const ScreenerResults: React.FC<{
  formData: any;
  setMessages: (value: any) => void;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setMessages, setFormData, setActiveStep }) => {
  const [screenerContent, setContent] = useState<
    ChatCompletionRequestMessage[]
  >([]);

  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState(formData.statement || "");
  const [isLoading, setLoading] = useState(false);
  const [showNextSteps, setShowNext] = useState(false);

  useEffect(() => {
    setContent(formData.messages);
  }, [formData.messages]);

  function Question({ text, options }: QuestionProps): React.ReactElement {
    return (
      <div className="question">
        <p>{text}</p>
        <ul>
          {options.map((option, index) => (
            <li key={index}>{`${String.fromCharCode(
              97 + index
            )}. ${option}`}</li>
          ))}
        </ul>
      </div>
    );
  }

  const parseSurveyQuestions = (
    text: string
  ): { question: string; options: string[] }[] => {
    // Split the text by numbers followed by a period to get each question.
    const questionRegex = /\d+\.\s(.*?)(?=\d+\.\s|$)/gs;
    const optionRegex = /\b[a-z]\.\s(.*?)(?=\b[a-z]\.\s|$)/gs;

    const questions = [];
    let questionMatch;
    while ((questionMatch = questionRegex.exec(text))) {
      const questionText = questionMatch[1];
      const options = [];
      let optionMatch;
      while ((optionMatch = optionRegex.exec(questionText))) {
        options.push(optionMatch[1]);
      }
      questions.push({
        question: questionText.split(/\b[a-z]\.\s/)[0],
        options,
      });
    }
    return questions;
  };

  const handleEditClick = () => {
    if (isEditing)
      setFormData((prevState: any) => ({ ...prevState, statement: prompt }));
    setIsEditing(!isEditing);
  };

  const handleGenerate = () => {
    setIsEditing(false);
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: userPrompt + prompt,
      };
      const response = await axios.post("/api/screener", {
        messages: userMessage,
      });

      setFormData((prevState: any) => ({
        ...prevState,
        messages: [...formData.messages, userMessage, response.data],
      }));
      setLoading(false);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return showNextSteps ? (
    <NextSteps />
  ) : (
    <Card className="flex flex-col gap-y-4">
      <Card className="bg-teal-200 px-2 rounded-md mx-4 my-2">
        <Flex className="justify-between items-center">
          <p className="text-lg font-bold">6. Recruiting Screener</p>
          <Flex>
            <Button
              onClick={handleGenerate}
              style={{ width: 160 }}
              className="px-6 py-2 mr-4 border-2 rounded-md shadow-md"
            >
              Generate more
            </Button>
            <Button
              style={{ width: 120 }}
              className="px-6 py-2 border-2 mr-4 rounded-md shadow-md"
            >
              Save list
            </Button>
            <Button
              onClick={() => setShowNext(true)}
              style={{ width: 120 }}
              className="px-6 py-2 border-2 mr-4 rounded-md shadow-md"
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Flex direction="column" className="m-6">
        <Flex direction="column">
          <Label className="my-4">
            <b>Recruiting statement: </b>
          </Label>
          {isEditing ? (
            <TextArea
              placeholder={prompt}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="mb-6 mt-1 p-6 text-2xl shadow-md"
            />
          ) : (
            <Card
              variant="ghost"
              className="mb-2 mt-4 mr-2 ml-1 p-4 px-6 text-md font-semibold bg-blue-100 shadow-md"
            >
              <Label className="mb-2 text-md">{prompt}</Label>
            </Card>
          )}
          <Flex>
            <Button
              onClick={handleEditClick}
              className="px-4 py-5 bg-blue-500 mr-4 mt-6  mb-8 text-white rounded-md w-1/6"
            >
              {!isEditing ? "Edit Statement" : "Save"}
            </Button>
          </Flex>
        </Flex>
        <Label className="my-4">
          <b>Screener questions: </b>
        </Label>
        {isLoading ? (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        ) : (
          <Flex direction="column">
            {screenerContent
              .filter((question) => question.role !== "user")
              .map((question) => (
                <div
                  key={question.content}
                  className={cn(
                    "w-full my-4 mt-4 flex items-start gap-x-8 rounded-lg",
                    question.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  <div className="survey-container">
                    {parseSurveyQuestions(
                      question.content ? question.content : ""
                    ).map((item, index) => (
                      <Question
                        key={index}
                        text={`${index + 1}. ${item.question}`}
                        options={item.options}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default ScreenerResults;
