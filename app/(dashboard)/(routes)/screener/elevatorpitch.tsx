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

const ElevatorPitch: React.FC<{
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
      formData.solution.length > 1 && formData.outcome.length > 1;
    if (isEdited) setActiveStep(2);
    else
      toast.error("Please fill all the details to continue", {
        position: "bottom-center",
      });
  };

  return (
    <Card mb="8">
      <Card className="bg-teal-200 px-2 rounded-md mx-4 my-2">
        <Flex className="justify-between items-center">
          <p className="text-lg font-bold">2. Elevator Pitch</p>
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
                <Label className="mb-2 text-md italic">
                  {`Now that you've defined your hi-need Niche, write an Elevator
                  Pitch connecting your solution with their needs & desires.`}
                </Label>
                <Label className="mb-6 text-md italic">
                  Think of this as your <b>initial hypothesis</b> - something
                  you can test & modify as you learn what does & doesn&apos;t
                  work.
                </Label>
                <Label className="mb-2 font-bold">We&apos;re building a</Label>
                <TextField.Input
                  name="solution"
                  value={formData.solution}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="In a few words, articulate your solution or product"
                  variant="surface"
                />
                <Label className="mb-2 mt-6">
                  <b>For </b> <i>{formData.niche}</i>
                </Label>
                <Label className="mb-2 mt-4 font-bold">so they can</Label>
                <TextField.Input
                  name="outcome"
                  value={formData.outcome}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="Define their desired outcome - solve a problem, scratch an itch, etc."
                  variant="surface"
                />
              </Flex>
            </Box>
          </Container>
        </Flex>
        <Flex direction="column" className="w-1/2 justify-center items-center">
          <Image
            alt="Elevator pitch"
            src="/pitch.jpg"
            width={440}
            height={440}
            className="rounded-lg"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ElevatorPitch;
