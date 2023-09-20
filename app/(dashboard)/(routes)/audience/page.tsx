"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Car, Users } from "lucide-react";
import { Tweet } from "react-twitter-widgets";

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
  Text,
  TextField,
} from "@radix-ui/themes";
import StepOne from "./addsource";
import StepTwo from "./steptwo";
import AddSource from "./addsource";
import ApplyFilter from "./applyfilter";
import PreviewSource from "./preview";
import { Label } from "@radix-ui/react-label";
import { any } from "zod";
import UserDetailsTable from "./userstable";

const steps = [
  { title: "StepOne", component: <StepOne /> },
  { title: "StepTwo", component: <StepTwo /> },
  { title: "StepThree", component: <StepOne /> },
  { title: "StepFour", component: <StepOne /> },
];

const AudiencePage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [tweetUrl, setTweetUrl] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [usersData, setUsersData] = useState([]);

  const handleTweetUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setTweetUrl(value);
  };

  const handleNextClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/twitterlikes", {
        params: {
          tweetUrl: tweetUrl,
        },
      });
      const data = response.data;
      console.log(data);
      const ids = data.likes.data.map((d: any) => d.id);
      try {
        const response = await axios.get("/api/twitterusers", {
          params: {
            ids: ids.toString(),
          },
        });
        const data = response.data.likes.data;
        console.log(data);
        setUsersData(data);
      } catch (error: any) {
        if (error?.response?.status === 403) {
          proModal.onOpen();
        } else {
          toast.error("Something went wrong.");
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/twitterauthor", {
        params: {
          tweetUrl: tweetUrl,
        },
      });
      const data = response.data.data.data;
      console.log(data);
      setTweetId(data.id);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  const getComponentFromStep = (currStep: Number) => {
    switch (currStep) {
      case 0:
        return <AddSource />;
      case 1:
        return <ApplyFilter />;
      case 2:
        return <PreviewSource />;
      default:
        return <AddSource />;
    }
  };

  return (
    <Container size="4">
      <Heading
        title="Audiences"
        description="Create audiences for your campaigns"
        icon={Users}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      {usersData.length == 0 && (
        <Card mx="4" className="card-elevation">
          <Flex direction="column">
            <Grid columns="1" gap="3" width="100%">
              <Container ml="5">
                <Label>
                  <b>Add tweet link</b>
                </Label>
                <Flex gap="3">
                  <Flex direction="column" gap="3">
                    <TextField.Input
                      variant="soft"
                      radius="large"
                      size="3"
                      my="4"
                      style={{ width: 400 }}
                      color="gray"
                      value={tweetUrl}
                      onChange={handleTweetUrlChange}
                      placeholder="https://twitter.com/user/status/1234"
                    />
                  </Flex>
                </Flex>
              </Container>
            </Grid>
            <Button my="5" ml="4" style={{ width: 120 }} onClick={handleSubmit}>
              Submit
            </Button>
            {tweetId.length > 0 && (
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
            )}
          </Flex>
        </Card>
      )}
      {usersData.length > 0 && (
        <Card m="4">
          <UserDetailsTable data={usersData} />
        </Card>
      )}
    </Container>
  );
};

export default AudiencePage;
