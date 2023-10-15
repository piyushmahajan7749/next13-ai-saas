"use client";

import { useState } from "react";
import { Users, VideoIcon } from "lucide-react";

import MultiStep from "react-multistep";

import { Heading } from "@/components/heading";

import { Container } from "@radix-ui/themes";
import ScreenerResults from "./screenerresults";
import Niche from "./niche";
import ElevatorPitch from "./elevatorpitch";
import Demographics from "./demographics";
import Behaviors from "./behaviors";
import RecruitingStatement from "./recruitingstatement";
import { ChatCompletionRequestMessage } from "openai";
import NextSteps from "./nextsteps";

const AudiencePage = () => {
  const [activeStep, setActiveStep] = useState(0); // 0-based index
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const [formData, setFormData] = useState({
    tam: "",
    niche: "",
    solution: "",
    outcome: "",
    demographics: "",
    location: "",
    agerange: "",
    qualifyingActivity: "",
    behavior: "",
    statement: "",
    messages: messages,
  });

  const goToNextStep = (newStep: number) => {
    setActiveStep(newStep);
  };

  const steps = [
    {
      title: "TAM vs Niche",
      component: (
        <Niche
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(1)}
        />
      ),
    },
    {
      title: "Elevator Pitch",
      component: (
        <ElevatorPitch
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(2)}
        />
      ),
    },
    {
      title: "Demographics",
      component: (
        <Demographics
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(3)}
        />
      ),
    },
    {
      title: "Traits & Behaviors",
      component: (
        <Behaviors
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(4)}
        />
      ),
    },
    {
      title: "Recruiting Statement",
      component: (
        <RecruitingStatement
          formData={formData}
          setFormData={setFormData}
          setMessages={setMessages}
          setActiveStep={() => goToNextStep(5)}
        />
      ),
    },
    {
      title: "Screener",
      component: (
        <ScreenerResults
          formData={formData}
          setFormData={setFormData}
          setMessages={setMessages}
          setActiveStep={() => goToNextStep(6)}
        />
      ),
    },
  ];

  return (
    <Container size="4">
      <Heading
        title="Superfan screener"
        description="Create a screener to recruit users for your research"
        icon={Users}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div
        className="bg-white shadow-md rounded-lg"
        style={{ maxHeight: 120, paddingBottom: 0 }}
      >
        <MultiStep
          steps={steps}
          showNavigation={false}
          activeStep={activeStep}
          key={activeStep}
          stepCustomStyle={{
            border: "none",
            height: 120,
            paddingBottom: "0px !important",
            color: "#333",
          }}
        />
      </div>
    </Container>
  );
};

export default AudiencePage;
