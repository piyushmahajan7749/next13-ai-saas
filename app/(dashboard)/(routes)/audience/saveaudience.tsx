import { db } from "@/app/api/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

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
import SavedAudiences from "./savedAudiences";
import { Label } from "@radix-ui/react-label";

const SaveAudience: React.FC<{
  formData: any;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setFormData, setActiveStep }) => {
  const [audienceName, setAudienceName] = useState(""); // New state for audience name

  const saveToFirestore = async (e: any) => {
    e.preventDefault();
    if (audienceName === "") {
      alert("Please enter an audience name.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "audiences"), {
        name: audienceName, // Save the audience name
        users: formData.usersData,
      });
      setActiveStep(3);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex direction="column">
      <Card mb="8">
        <Callout.Root className="mx-4 my-4">
          <Callout.Text className="text-6xl font-bold">
            3. Save Audience
          </Callout.Text>
        </Callout.Root>
        <Container ml="6" mt="6">
          <Flex direction="column" className="w-1/4">
            <Label className="text-md font-semibold mb-8 ml-2">
              Audience Size: {formData.usersData.length}
            </Label>
            <TextField.Input
              type="text"
              placeholder="Audience name"
              className="my-1 mx-2"
              value={audienceName}
              onChange={(e) => setAudienceName(e.target.value)}
            />
            <Button my="6" style={{ width: 140 }} onClick={saveToFirestore}>
              Save
            </Button>
          </Flex>
        </Container>
      </Card>
    </Flex>
  );
};

export default SaveAudience;
