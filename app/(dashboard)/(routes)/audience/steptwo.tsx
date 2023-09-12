"use client";

import { Badge, Box, Card, Container, Flex, Text } from "@radix-ui/themes";

const StepTwo = () => {
  return (
    <Container>
      <Box mr="3">
        <Flex gap="3">
          <Card>
            <Flex direction="column" gap="3">
              <Text>Tweet Source</Text>
            </Flex>
          </Card>
          <Card>
            <Text>Bio Contents</Text>
            <Flex gap="3">
              <Badge color="blue">Marketer</Badge>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Container>
  );
};

export default StepTwo;
