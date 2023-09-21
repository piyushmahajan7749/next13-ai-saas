import { userPrompt } from "@/app/constants/strings";
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
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/router";
import { ChatCompletionRequestMessage } from "openai";
import React, { useState } from "react";
import toast from "react-hot-toast";
import YouTube from "react-youtube";

const RecruitingStatement: React.FC<{
  formData: any;
  setMessages: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setMessages, setActiveStep }) => {
  const stmnt = `We're recruiting ${formData.demographics}, ${formData.agerange} in ${formData.location} who ${formData.behavior}, searching for ${formData.outcome} to help us test ${formData.solution}`;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(stmnt || "");

  const handleEditClick = () => {
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

      setMessages((current: any) => [...current, userMessage, response.data]);
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
      <Callout.Root className="mx-4 my-4">
        <Callout.Text className="text-6xl font-bold">
          5. Recruiting Statement
        </Callout.Text>
      </Callout.Root>
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
                  Take a look at your statement. Is that who you're looking for?
                  Edit the statement if you want to make changes. When you're
                  done editing, go ahead & generate a screener.
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
                    <Button
                      onClick={handleGenerate}
                      className="px-4 py-6 bg-blue-500 mt-10  mb-4 text-white rounded-md w-1/3"
                    >
                      Generate Screener
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Box>
          </Container>
        </Flex>
        <Flex direction="column" className="w-1/2">
          <Card m="6">
            <YouTube videoId="1jVp6aRftR8" />
          </Card>
        </Flex>
      </Flex>
    </Card>
  );
};

export default RecruitingStatement;
