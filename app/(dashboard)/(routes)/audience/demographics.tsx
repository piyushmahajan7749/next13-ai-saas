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

const Demographics: React.FC<{
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
          3. Demographics
        </Callout.Text>
      </Callout.Root>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="5" mt="4">
            <Box className="p-1">
              <Flex direction="column">
                <Card className="mb-6 p-2 text-md bg-green-500 shadow-md">
                  <Flex direction="column">
                    <Label className="mb-2 text-md font-semibold">
                      ELEVATOR PITCH
                    </Label>
                    <Label className="mb-2 text-md">
                      {`We're building a ${formData.solution} for ${formData.niche}
                      so they can ${formData.outcome}`}
                    </Label>
                  </Flex>
                </Card>
                <Label className="mb-4 text-md italic">
                  {`Now that your Elevator Pitch is in place, let's define
                  recruiting parameters for your hi-need beachhead niche. Let's
                  start with basic demographics.`}
                </Label>
                <Label className="mb-2 mt-2 font-bold">
                  We&apos;re recruiting
                </Label>
                <TextField.Input
                  name="demographics"
                  value={formData.demographics}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="Role/Gender/Issue"
                  variant="surface"
                />
                <Label className="mb-2 mt-2 font-bold">Age range</Label>
                <TextField.Input
                  name="agerange"
                  value={formData.agerange}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="Age range"
                  variant="surface"
                />
                <Label className="mb-2 mt-4 font-bold">Located in</Label>
                <TextField.Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="Location"
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
            alt="Demographics"
            src="/demographics.jpg"
            width={440}
            height={440}
            className="rounded-lg"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Demographics;
