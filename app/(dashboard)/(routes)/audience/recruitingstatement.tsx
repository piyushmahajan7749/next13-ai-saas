import { userPrompt } from "@/app/constants/strings";
import Image from "next/image";
import { Loader } from "@/components/loader";
import { Label } from "@radix-ui/react-label";
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  TextArea,
} from "@radix-ui/themes";
import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RecruitingStatement: React.FC<{
  formData: any;
  setMessages: (value: any) => void;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setMessages, setFormData, setActiveStep }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(formData.statement || "");

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
        messages: [userMessage, response.data],
      }));
      setLoading(false);
      setActiveStep(6);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card mb="8">
      <Card className="bg-teal-200 px-2 rounded-md mx-4 my-2">
        <Flex className="justify-between items-center">
          <p className="text-lg font-bold">5. Recruiting Statement</p>
          <Flex>
            <Button
              onClick={handleGenerate}
              style={{ width: 120 }}
              className="px-6 py-2 border-2 mr-4 rounded-md shadow-md"
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="5" mt="6">
            <Box className="p-1">
              <Flex direction="column">
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
                    className="mb-6 mt-1 p-4 px-6 text-md font-semibold bg-blue-100 shadow-md"
                  >
                    <Label className="mb-2 text-md">{prompt}</Label>
                  </Card>
                )}
                <Label className="my-6 text-md italic">
                  Take a look at your statement. Is that who you&apos;re looking
                  for? Edit the statement if you want to make changes. When
                  you&apos;re done editing, go ahead & generate a screener.
                </Label>
                {isLoading ? (
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader />
                  </div>
                ) : (
                  <Flex>
                    <Button
                      onClick={handleEditClick}
                      className="px-4 py-6 bg-blue-500 mr-4 mt-10  mb-4 text-white rounded-md w-1/3"
                    >
                      {!isEditing ? "Edit Statement" : "Save"}
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Box>
          </Container>
        </Flex>

        <Flex direction="column" className="w-1/2 justify-center items-center">
          <Image
            alt="Recruiting statement"
            src="/statement.jpg"
            width={440}
            height={440}
            className="rounded-lg"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default RecruitingStatement;
