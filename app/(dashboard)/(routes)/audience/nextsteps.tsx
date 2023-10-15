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

const NextSteps = () => {
  return (
    <Card mb="8">
      <Card className="bg-teal-200 px-2 rounded-md mx-4 my-2">
        <Flex className="justify-between items-center">
          <p className="text-lg font-bold">Next steps</p>
          <Flex>
            <Button
              style={{ width: 120 }}
              className="px-6 py-2 border-2 mr-4 rounded-md shadow-md"
            >
              Save list
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Card
        variant="ghost"
        className="mx-4 my-8 text-md  bg-blue-100 shadow-md w-1/2"
      >
        <Flex direction="column" className="rounded-md mx-4 my-2">
          <Label className="my-3">
            1. Run your screener on UserInterviews or other places your Niche
            hangs out.
          </Label>
          <Label className="my-3">
            2. Invite the best Screener respondents into 5-10 min Speed
            Interviews.
          </Label>
          <Label className="my-3">
            3. Select the best Speed Interviewees for playtests & study their
            habits.
          </Label>
          <Label className="my-3">
            4. Summarize insights into job stories from your best Speed
            Interviews.
          </Label>
        </Flex>
      </Card>
      <Container className="my-4 mx-6 w-1/2">
        <Label className="text-md italic ">
          {`
Follow these steps to run your screener & find hi-need customers  
If you want hands-on help, reach out - that's what we do. 
`}
        </Label>
      </Container>
    </Card>
  );
};

export default NextSteps;
