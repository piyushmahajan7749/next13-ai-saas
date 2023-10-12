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

const Niche: React.FC<{
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
          1. TAM vs NICHE
        </Callout.Text>
      </Callout.Root>
      <Flex>
        <Flex direction="column" className="w-1/2">
          <Container ml="5" mt="4">
            <Box className="p-1">
              <Flex direction="column">
                <Label className="mb-2 text-md">
                  The beachhead is not the destination. When you&apos;re
                  building something new, the best way to start is by targeting
                  high-need early adopters.
                </Label>
                <Label className="mb-4 text-md">
                  Closer to shipping, you&apos;ll expand to a broader audience &
                  grow your TAM.
                </Label>
                <Label className="mb-2">
                  <b>Think big. </b>
                  <i>
                    What&apos;s your total addressable market (TAM)? AKA large
                    future market
                  </i>
                </Label>
                <TextField.Input
                  name="tam"
                  value={formData.tam}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="Large future market"
                  variant="surface"
                />
                <Label className="mb-2 mt-4">
                  <b>Think small. </b>
                  <i>
                    What highly specific niche has a burning need for your
                    product right now?
                  </i>
                </Label>
                <TextField.Input
                  name="niche"
                  value={formData.niche}
                  onChange={handleInputChange}
                  className="mb-2 px-4 pt-2 w-full"
                  placeholder="Hi-need beachhead"
                  variant="surface"
                />
                <Button
                  className="px-4 py-6 bg-blue-500 mt-10  mb-4 text-white rounded-md w-1/4"
                  onClick={setActiveStep}
                >
                  Next
                </Button>
              </Flex>
            </Box>
          </Container>
        </Flex>
        <Flex direction="column" className="w-1/2 justify-center items-center">
          <Image
            alt="niche"
            src="/niche.jpg"
            width={440}
            height={440}
            className="rounded-lg"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Niche;
