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
import toast from "react-hot-toast";

const Demographics: React.FC<{
  formData: any;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setFormData, setActiveStep }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleNext = () => {
    const isEdited =
      formData.demographics.length > 1 &&
      formData.agerange.length > 1 &&
      formData.location.length > 1;
    if (isEdited) setActiveStep(3);
    else
      toast.error("Please fill all the details to continue", {
        position: "bottom-center",
      });
  };

  return (
    <Card mb="8">
      <Card className="bg-teal-200 px-2 rounded-md mx-4 my-2">
        <Flex className="justify-between items-center">
          <p className="text-lg font-bold">3. Demographics</p>
          <Flex>
            <Button
              onClick={handleNext}
              style={{ width: 120 }}
              className="px-6 py-2 border-2 mr-4 rounded-md shadow-md"
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="5" mt="4">
            <Box className="p-1">
              <Flex direction="column">
                <Card
                  variant="ghost"
                  className="mb-6 mt-1 p-4 px-6 text-md font-semibold bg-blue-100 shadow-md"
                >
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
