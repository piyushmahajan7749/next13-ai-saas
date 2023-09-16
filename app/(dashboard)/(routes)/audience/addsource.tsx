"use client";

import { Label } from "@radix-ui/react-label";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  TextArea,
} from "@radix-ui/themes";

const AddSource = () => {
  return (
    <Grid columns="1" gap="3" width="100%">
      <Container ml="5">
        <Heading my="3">Add your recruiting statement in this format</Heading>
        <Flex gap="3">
          <Flex direction="column" gap="3">
            <Box style={{ width: "300" }}>
              <Flex direction="column">
                <Label>
                  We're recruiting ________(role and/or gender) ___________ (age
                  range)
                </Label>
                <Label>located in ____________ (locations)</Label>
                <Label>
                  who ______ (qualifying activity, condition or problem)
                </Label>
                <Label>
                  searching for _______________ (solution-seeking behavior)
                </Label>
                <Label>to help us test ______ (R&D activity)</Label>
              </Flex>
            </Box>
            <TextArea
              variant="soft"
              my="6"
              style={{ width: 600 }}
              rows={5}
              placeholder="e.g. We're recruiting adults 18-55 located in United States who
                suffer from eczema and/or dry itchy skin searching for a topical
                non-steroidal cure to help us test a new healing lotion &
                skincare app."
            />
          </Flex>
        </Flex>
      </Container>
    </Grid>
  );
};

export default AddSource;
