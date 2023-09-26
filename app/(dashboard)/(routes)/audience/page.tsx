"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import MultiStep from "react-multistep";

import { Heading } from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  TextField,
} from "@radix-ui/themes";
import UserDetailsTable from "./userstable";
import AddSource from "./addsource";
import SavedAudiences from "./savedAudiences";
import SaveAudience from "./saveaudience";

const AudiencePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    tweetUrl: "",
    tweetId: "",
    usersData: "",
  });

  const goToNextStep = (newStep: number) => {
    setActiveStep(newStep);
  };

  const steps = [
    {
      title: "Add Source",
      component: (
        <AddSource
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(1)}
        />
      ),
    },
    {
      title: "Apply Filters",
      component: (
        <UserDetailsTable
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(2)}
        />
      ),
    },
    {
      title: "Save Audience",
      component: (
        <SaveAudience
          formData={formData}
          setFormData={setFormData}
          setActiveStep={() => goToNextStep(3)}
        />
      ),
    },
    {
      title: "Saved Audiences",
      component: <SavedAudiences />,
    },
  ];

  return (
    <Container size="4">
      <Heading
        title="Create Audience"
        description="Create a new audience for your campaigns"
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
