"use client";

import { Label } from "@radix-ui/react-label";
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
import { Tweet } from "react-twitter-widgets";

const AddSource: React.FC<{
  formData: any;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setFormData, setActiveStep }) => {
  const [usersData, setUsersData] = useState([]);
  const [tweetId, setTweetId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, tweetUrl: value }));
  };

  const handleNextClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/twitterlikes", {
        params: {
          tweetUrl: formData.tweetUrl,
        },
      });
      const data = response.data;
      const ids = data.likes.data.map((d: any) => d.id);
      try {
        const response = await axios.get("/api/twitterusers", {
          params: {
            ids: ids.toString(),
          },
        });
        const data = response.data.likes.data;
        setFormData((prevState: any) => ({ ...prevState, usersData: data }));
        setUsersData(data);
        setActiveStep(1);
      } catch (error: any) {
        toast.error("Something went wrong.");
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/twitterauthor", {
        params: {
          tweetUrl: formData.tweetUrl,
        },
      });
      const data = response.data.data.data;
      setFormData((prevState: any) => ({ ...prevState, tweetId: data.id }));
      setTweetId(data.id);
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Card mb="8">
      <Callout.Root className="mx-4 my-4">
        <Callout.Text className="text-6xl font-bold">
          1. Add Source
        </Callout.Text>
      </Callout.Root>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="6" mt="6">
            <Box>
              <Flex direction="column">
                <Label className="text-md font-semibold">
                  Add link of a tweet you want to source your audience from
                </Label>
                <TextField.Input
                  variant="soft"
                  radius="large"
                  size="3"
                  my="8"
                  style={{ width: 540, height: 50 }}
                  color="gray"
                  value={formData.tweetUrl}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/user/status/1234"
                />
                {tweetId.length > 0 ? (
                  <Flex direction="column" gap="3" my="4">
                    <Tweet tweetId={tweetId} />
                    <Button
                      my="5"
                      ml="4"
                      style={{ width: 120 }}
                      onClick={handleNextClick}
                    >
                      Next
                    </Button>
                  </Flex>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="px-4 py-6 bg-blue-500 mt-10 mb-4 text-white rounded-md w-1/4"
                  >
                    Add
                  </Button>
                )}
              </Flex>
            </Box>
          </Container>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AddSource;
