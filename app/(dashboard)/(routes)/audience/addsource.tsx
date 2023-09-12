"use client";

import {
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  TextField,
} from "@radix-ui/themes";

const AddSource = () => {
  return (
    <Grid columns="1" gap="3" width="100%">
      <Container ml="5">
        <Heading my="3">Add tweet link</Heading>
        <Flex gap="3">
          <Flex direction="column" gap="3">
            <TextField.Input
              variant="soft"
              radius="large"
              size="3"
              style={{ width: 400 }}
              color="gray"
              placeholder="https://twitter.com/user/status/1234"
            />
          </Flex>
        </Flex>
      </Container>
    </Grid>
  );
};

export default AddSource;
