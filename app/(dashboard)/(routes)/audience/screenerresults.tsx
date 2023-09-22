"use client";

import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Button, Callout, Card, Container, Flex } from "@radix-ui/themes";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";

const ScreenerResults: React.FC<{
  formData: any;
  messages: any;
}> = ({ formData, messages }) => {
  const [screenerContent, setContent] = useState([]);
  useEffect(() => {
    setContent(messages);
  }, [messages]);

  const parseSurveyQuestions = (text: string) => {
    // Split the text by numbers followed by a period to get each question.
    const questions = text.split(/\d+\./).filter(Boolean);

    return questions.map((question, index) => {
      // Separate the question part and the options part
      const [questionText, ...optionsText] = question.split(/\n-/);

      // Create the options list if options are present
      const options =
        optionsText.length > 0 ? (
          <ul>
            {optionsText.map((option, i) => (
              <li key={i}>{option.trim()}</li>
            ))}
          </ul>
        ) : null;

      return (
        <div key={index} className="question">
          <p>
            <strong>{index + 1 + ". " + questionText.trim()}</strong>
          </p>
          {options}
        </div>
      );
    });
  };

  return (
    <Card className="flex flex-col gap-y-4">
      <Label>
        <b>Screener questions: </b>
      </Label>
      {screenerContent
        .filter((question) => question.role != "user")
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
              {parseSurveyQuestions(question.content || "")}
            </div>
          </div>
        ))}
      <Flex>
        <Button className="px-4 py-6 bg-blue-500 mr-4 mt-10  mb-4 text-white rounded-md w-1/3">
          Save
        </Button>
        <Button className="px-4 py-6 bg-blue-500 mt-10  mb-4 text-white rounded-md w-1/3">
          Re-Generate
        </Button>
      </Flex>
    </Card>
  );
};

export default ScreenerResults;
