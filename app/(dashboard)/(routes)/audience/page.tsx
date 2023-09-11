"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

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

const AudiencePage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [tweetUrl, setTweetUrl] = useState("");

  const handleTweetUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setTweetUrl(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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

  return (
    <Container size="4">
      <Heading
        title="Audiences"
        description="Create audiences for your campaigns"
        icon={Users}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <Flex gap="3">
        <Box>
          <TextField.Input
            value={tweetUrl}
            placeholder="Enter twitter url…"
            size="3"
            onChange={handleTweetUrlChange}
          />
        </Box>
        <Button onClick={handleSubmit}>Submit</Button>
      </Flex>
      <Box mr="3">
        <Flex gap="3">
          <Card>
            <Flex direction="column" gap="3">
              <Text>Tweet Source</Text>
              <Text>Tweet by @nkjnj</Text>
              <Text>What's the highest ROI activity you can do today?</Text>
              <Text>3.2 Likers</Text>
              <Text>206 Retweets</Text>
            </Flex>
          </Card>
          <Card>
            <Text>Bio Contents</Text>
            <Flex gap="3">
              <Badge color="blue">Marketer</Badge>
              <Badge color="blue">SMMA</Badge>
              <Badge color="blue">agency</Badge>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Container>
  );
};

export default AudiencePage;
