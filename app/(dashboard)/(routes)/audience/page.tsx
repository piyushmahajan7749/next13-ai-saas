"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Car, Users } from "lucide-react";
import MultiStep from "react-multistep";

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

  const [step, setStep] = useState(0);

  const handleTweetUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setTweetUrl(value);
  };

  const handleNextClick = () => {
    setStep(step + 1);
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
      <Card mx="4">
        <Flex direction="column">
          {getComponentFromStep(step)}
          <Button
            my="5"
            ml="5"
            style={{ width: 120 }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Flex>
      </Card>
    </Container>
  );
};

export default AudiencePage;
