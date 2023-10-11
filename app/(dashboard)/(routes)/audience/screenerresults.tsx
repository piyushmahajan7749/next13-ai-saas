"use client";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Button, Callout, Card, Container, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface QuestionProps {
  text: string;
  options: string[]; // or whatever type your options should be
}

const ScreenerResults: React.FC<{
  formData: any;
  messages: any;
}> = ({ formData, messages }) => {
  const [screenerContent, setContent] = useState([]);
  useEffect(() => {
    setContent(messages);
  }, [messages]);

  function Question({ text, options }: QuestionProps) {
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

  const parseSurveyQuestions = (text: string) => {
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
              {parseSurveyQuestions(question.content || "").map(
                (item, index) => (
                  <Question
                    key={index}
                    text={`${index + 1}. ${item.question}`}
                    options={item.options}
                  />
                )
              )}
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
