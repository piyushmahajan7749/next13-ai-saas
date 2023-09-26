"use client";

import { useState } from "react";
import { Timer } from "lucide-react";

import { Heading } from "@/components/heading";
import { Container } from "@radix-ui/themes";
import ConfigureMessage from "../configuremessage/page";
import { Audience } from "./constants";
import MultiStep from "react-multistep";
import SelectAudience from "./selectaudience";
import ScheduleMessage from "./schedulemessage";

const AutomationsPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedAudience, setSelectedAudience] = useState<Audience>();

  const goToNextStep = (newStep: number) => {
    setActiveStep(newStep);
  };

  const steps = [
    {
      title: "Select Audience",
      component: (
        <SelectAudience
          setSelectedAudience={setSelectedAudience}
          setActiveStep={() => goToNextStep(1)}
        />
      ),
    },
    {
      title: "Configure Messages",
      component: (
        <ConfigureMessage
          selectedAudience={selectedAudience}
          setActiveStep={() => goToNextStep(2)}
        />
      ),
    },
    {
      title: "Schedule",
      component: (
        <ScheduleMessage
          audience={selectedAudience}
          setActiveStep={() => goToNextStep(2)}
        />
      ),
    },
  ];

  return (
    <Container size="4">
      <Heading
        title="Automation"
        description="Start a Cold DM Automation"
        icon={Timer}
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

export default AutomationsPage;
