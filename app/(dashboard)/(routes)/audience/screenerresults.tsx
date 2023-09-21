"use client";

import { recruitingStmntPlaceholder } from "@/app/constants/strings";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { Label } from "@radix-ui/react-label";
import {
  Callout,
  Card,
  Container,
  Flex,
  IconButton,
  TextArea,
} from "@radix-ui/themes";
import { Box, Edit, SaveIcon } from "lucide-react";
import { useState } from "react";

const ScreenerResults: React.FC<{
  formData: any;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setFormData, setActiveStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

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
    <Card mb="8">
      <Callout.Root className="mx-4 my-4">
        <Callout.Text className="text-6xl font-bold">
          6. Recruiting Screener
        </Callout.Text>
      </Callout.Root>
      <Flex direction="column" className="w-1/2">
        <Container ml="5" mt="4">
          <Box className="p-1">
            <Flex direction="column">
              <div className="flex flex-col gap-y-4">
                <Label>
                  <b>Screener questions: </b>
                </Label>
                {/* {questions
                  .filter((question) => question.role != "user")
                  .map((question) => (
                    <div
                      key={question.content}
                      className={cn(
                        "p-8 w-full flex items-start gap-x-8 rounded-lg",
                        question.role === "user"
                          ? "bg-white border border-black/10"
                          : "bg-muted"
                      )}
                    >
                      {question.role === "user" ? (
                        <UserAvatar />
                      ) : (
                        <BotAvatar />
                      )}
                      <div className="survey-container">
                        {parseSurveyQuestions(question.content || "")}
                      </div>
                    </div>
                  ))} */}
              </div>
            </Flex>
          </Box>
        </Container>
      </Flex>
    </Card>
  );
};

export default ScreenerResults;
