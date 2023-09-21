import { Label } from "@radix-ui/react-label";
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

const ElevatorPitch: React.FC<{
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
          2. Elevator Pitch
        </Callout.Text>
      </Callout.Root>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="5" mt="4">
            <Box className="p-1">
              <Flex direction="column">
                <Label className="mb-2 text-md italic">
                  Now that you've defined your hi-need Niche, write an Elevator
                  Pitch connecting your solution with their needs & desires.
                </Label>
                <Label className="mb-6 text-md italic">
                  Think of this as your <b>initial hypothesis</b> - something
                  you can test & modify as you learn what does & doesn't work.
                </Label>
                <Label className="mb-2 font-bold">We're building a</Label>
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
        <Flex direction="column" className="w-1/2">
          <Card m="6">
            <YouTube videoId="1jVp6aRftR8" />
          </Card>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ElevatorPitch;
