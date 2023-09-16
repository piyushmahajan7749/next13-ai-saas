"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Edit, SaveIcon, Users, VideoIcon } from "lucide-react";
import { ChatCompletionRequestMessage } from "openai";

import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  IconButton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import EditableLabel from "@/components/ui/editablelabel";

const AudiencePage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const [prompt, setPrompt] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [step, setStep] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: `Based on the CRITERIA provided, you will create a 6-question screener to select the best users to interview. CRITERIA = ${prompt}`,
      };

      const response = await axios.post("/api/code", { messages: userMessage });
      setMessages((current) => [...current, userMessage, response.data]);
      setStep(step + 1);
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setPrompt(e.target.value);
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
    <Container size="4">
      <div className="flex justify-between">
        <Flex style={{ justifyContent: "space-between", width: "100%" }}>
          <Heading
            title="Superfan screener"
            description="Create a screener to recruit users for your research"
            icon={Users}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
          />
          <Button variant="surface" radius="medium">
            <VideoIcon width="16" height="16" /> Watch tutorial
          </Button>
        </Flex>
      </div>
      <Card mx="4">
        <Flex direction="column">
          <Grid columns="1" gap="3" width="100%">
            <Container ml="5" mt="4">
              {step == 0 ? (
                <Flex direction="column" gap="3">
                  {!isLoading && (
                    <Box style={{ width: "300" }}>
                      <Flex direction="column" gap="3">
                        <Label>
                          <b>Add your recruiting statement in this format</b>
                        </Label>
                        <Label>
                          We're recruiting ________(role and/or gender)
                          ___________ (age range)
                        </Label>
                        <Label>located in ____________ (locations)</Label>
                        <Label>
                          who ______ (qualifying activity, condition or problem)
                        </Label>
                        <Label>
                          searching for _______________ (solution-seeking
                          behavior)
                        </Label>
                        <Label>to help us test ______ (R&D activity)</Label>
                      </Flex>
                    </Box>
                  )}
                  {!isLoading && (
                    <TextArea
                      variant="soft"
                      my="6"
                      style={{ width: 600 }}
                      value={prompt}
                      rows={8}
                      onChange={handleTextArea}
                      placeholder="e.g. We're recruiting adults 18-55 located in United States who
                suffer from eczema and/or dry itchy skin searching for a topical
                non-steroidal cure to help us test a new healing lotion &
                skincare app."
                    />
                  )}
                </Flex>
              ) : (
                <Flex direction="column" gap="3" mx="4">
                  <Label>
                    <b>Recruting statement:</b>
                  </Label>

                  <Container style={{ width: 400 }} mb="4" mt="2">
                    <Flex gap="2">
                      {!isEditing ? (
                        <Label>{prompt}</Label>
                      ) : (
                        <TextArea
                          variant="soft"
                          my="6"
                          style={{ width: 600 }}
                          value={prompt}
                          rows={8}
                          onChange={handleTextArea}
                          placeholder="e.g. We're recruiting adults 18-55 located in United States who
                suffer from eczema and/or dry itchy skin searching for a topical
                non-steroidal cure to help us test a new healing lotion &
                skincare app."
                        />
                      )}
                      <IconButton
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                      >
                        {isEditing ? (
                          <SaveIcon width="18" height="18" />
                        ) : (
                          <Edit width="18" height="18" />
                        )}
                      </IconButton>
                    </Flex>
                  </Container>
                  <div className="flex flex-col gap-y-4">
                    <Label>
                      <b>Screener questions: </b>
                    </Label>
                    {messages
                      .filter((message) => message.role != "user")
                      .map((message) => (
                        <div
                          key={message.content}
                          className={cn(
                            "p-8 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "user"
                              ? "bg-white border border-black/10"
                              : "bg-muted"
                          )}
                        >
                          {message.role === "user" ? (
                            <UserAvatar />
                          ) : (
                            <BotAvatar />
                          )}
                          {/* <ReactMarkdown
                            components={{
                              ol: ({ ordered, ...props }) => (
                                <ol
                                  {...props}
                                  style={{ listStyleType: "decimal" }}
                                />
                              ),
                              li: ({ ...props }) => (
                                <li
                                  {...props}
                                  style={{ listStyleType: "decimal" }}
                                />
                              ),
                            }}
                            className="overflow-hidden leading-7"
                          >
                            {message.content || ""}
                          </ReactMarkdown> */}
                          <div className="survey-container">
                            {parseSurveyQuestions(message.content || "")}
                          </div>
                        </div>
                      ))}
                  </div>
                </Flex>
              )}
            </Container>
          </Grid>
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!isLoading && (
            <Button
              my="5"
              ml="5"
              style={{ width: 160 }}
              onClick={handleSubmit}
              radius="large"
            >
              {step == 0 ? "Generate" : "Generate more"}
            </Button>
          )}
        </Flex>
      </Card>
    </Container>
  );
};

export default AudiencePage;
