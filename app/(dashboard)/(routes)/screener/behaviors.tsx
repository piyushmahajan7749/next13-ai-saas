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
import toast from "react-hot-toast";

const Behaviors: React.FC<{
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
      formData.qualifyingActivity.length > 1 && formData.behavior.length > 1;
    if (isEdited) {
      const stmnt = `We're recruiting ${formData.demographics}, ${formData.agerange} in ${formData.location} who ${formData.qualifyingActivity}, searching for ${formData.outcome} to help us test ${formData.solution}`;
      setFormData((prevState: any) => ({ ...prevState, statement: stmnt }));
      setActiveStep(4);
    } else
      toast.error("Please fill all the details to continue", {
        position: "bottom-center",
      });
  };

  return (
    <Card mb="8">
      <Card className="bg-teal-200 px-2 rounded-md mx-4 my-2">
        <Flex className="justify-between items-center">
          <p className="text-lg font-bold">4. Traits & Behaviors</p>
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
