"use client";

import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  TextField,
} from "@radix-ui/themes";

const ApplyFilter = () => {
  return (
    <Grid columns="1" gap="3" width="100%">
      <Container ml="5">
        <Heading my="3">Add Filters</Heading>
        <Flex gap="3">
          <Flex gap="3">
            <TextField.Input
              variant="soft"
              radius="large"
              size="3"
              style={{ width: 400 }}
              color="gray"
              placeholder="e.g. Marketer, SEO, SMMA"
            />
            <Button style={{ width: 100 }}>Add</Button>
          </Flex>
        </Flex>
      </Container>
    </Grid>
  );
};

export default ApplyFilter;
