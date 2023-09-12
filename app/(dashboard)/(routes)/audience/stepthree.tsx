"use client";

import { Badge, Box, Card, Container, Flex, Text } from "@radix-ui/themes";

const StepOne = () => {
  return (
    <Container>
      <Box mr="3">
        <Flex gap="3">
          <Card>
            <Flex direction="column" gap="3">
              <Text>Tweet Source</Text>
              <Text>Tweet by @nkjnj</Text>
              <Text>What's the highest ROI activity you can do today?</Text>
              <Text>3.2 Likers</Text>
              <Text>206 Retweets</Text>
            </Flex>
          </Card>
          <Card>
            <Text>Bio Contents</Text>
            <Flex gap="3">
              <Badge color="blue">Marketer</Badge>
              <Badge color="blue">SMMA</Badge>
              <Badge color="blue">agency</Badge>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Container>
  );
};

export default StepOne;
