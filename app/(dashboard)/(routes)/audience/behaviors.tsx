import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import YouTube from "react-youtube";

const Behaviors: React.FC<{
  formData: any;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setFormData, setActiveStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <Card mb="8">
      <Callout.Root className="mx-4 my-4">
        <Callout.Text className="text-6xl font-bold">
          4. Traits & Behaviors
        </Callout.Text>
      </Callout.Root>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="5" mt="4">
            <Box className="p-1">
              <Flex direction="column">
                <Card className="mb-6 p-2 text-md bg-green-500 shadow-md">
                  <Flex direction="column">
                    <Label className="mb-2 text-sm font-semibold">
                      RECRUITING DEMOGRAPHICS
                    </Label>
                    <Label className="mb-2 text-md">
                      {`We're looking for ${formData.demographics},
                      ${formData.agerange} in ${formData.location}`}
                    </Label>
                  </Flex>
                </Card>
                <Label className="mb-4 text-md italic">
                  {`Now that we've defined our demographics, let's articulate the
                  qualifying activity, interest, problem, or issue shared by our
                  Niche - and the outcomes they're looking for.`}
                </Label>
                <Label className="mb-2 mt-4 font-bold">who</Label>
                <TextField.Input
                  name="qualifyingActivity"
                  value={formData.qualifyingActivity}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="qualifying activity, interest, problem or health issue"
                  variant="surface"
                />
                <Label className="mb-2 mt-4 font-bold">searching for</Label>
                <TextField.Input
                  name="behavior"
                  value={formData.behavior}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="solution-seeking behavior that demonstrates an urgent problem"
                  variant="surface"
                />
                <Button
                  onClick={setActiveStep}
                  className="px-4 py-6 bg-blue-500 mt-10  mb-4 text-white rounded-md w-1/4"
                >
                  Next
                </Button>
              </Flex>
            </Box>
          </Container>
        </Flex>

        <Flex direction="column" className="w-1/2 justify-center items-center">
          <Image
            alt="Traits and behaviors"
            src="/behaviors.jpg"
            width={440}
            height={440}
            className="rounded-lg"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Behaviors;
