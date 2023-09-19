import { db } from "@/app/api/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import SavedAudiences from "./savedAudiences";

const UserDetailsTable = ({ data }) => {
  const columns = [
    {
      name: "",
      selector: "profile_image_url",
      cell: (row) => (
        <img src={row.profile_image_url} alt="Profile" height="50" width="50" />
      ),
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Description",
      selector: "description",
    },
    {
      name: "Location",
      selector: "location",
    },
    {
      name: "Username",
      selector: "username",
    },
  ];

  const [audienceName, setAudienceName] = useState(""); // New state for audience name
  const [audienceSaved, setAudienceSaved] = useState(false); // New state for audience name

  const saveToFirestore = async (e: any) => {
    e.preventDefault();
    if (audienceName === "") {
      alert("Please enter an audience name.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "audiences"), {
        name: audienceName, // Save the audience name
        users: data,
      });
      setAudienceSaved(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return !audienceSaved ? (
    <Flex direction="column">
      <Box height="100%">
        <Flex>
          <TextField.Input
            placeholder="Enter Audience Name"
            value={audienceName}
            onChange={(e) => setAudienceName(e.target.value)}
            radius="small"
            size="1"
            style={{ width: 240 }}
          />

          <Button
            my="5"
            ml="5"
            style={{ width: 180 }}
            onClick={saveToFirestore}
          >
            Save Audience
          </Button>
        </Flex>
      </Box>
      <DataTable title="User Details" columns={columns} data={data} />;
    </Flex>
  ) : (
    <SavedAudiences />
  );
};

export default UserDetailsTable;
