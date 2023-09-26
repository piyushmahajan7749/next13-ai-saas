// components/FetchAudiences.js

import { db } from "@/app/api/firebase/firebase";
import { Heading } from "@/components/heading";
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Grid,
} from "@radix-ui/themes";
import { collection, getDocs } from "firebase/firestore";
import { Users } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Audience } from "./constants";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { Label } from "@radix-ui/react-label";

const SelectAudience: React.FC<{
  setActiveStep: (value: any) => void;
  setSelectedAudience: (value: any) => void;
}> = ({ setSelectedAudience, setActiveStep }) => {
  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const handleAudienceClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const idx = e.currentTarget.getAttribute("data-id");
    setSelectedAudience(audiences[parseInt(idx || "-1")]);
    setSelectedCardIndex(parseInt(idx || "-1"));
  };

  useEffect(() => {
    const fetchAudiences = async () => {
      setLoading(true);
      await getDocs(collection(db, "audiences")).then((querySnapshot) => {
        const newData: Audience[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Audience, "id">), // Cast the data to omit the 'id' field
          id: doc.id,
        }));
        setAudiences(newData);
        setLoading(false);
      });
    };

    fetchAudiences();
  }, []);

  return (
    <Card mb="8" key={audiences.length}>
      <Box>
        <Callout.Root className="mx-4 my-4">
          <Callout.Text className="text-6xl font-bold">
            1. Select Audience
          </Callout.Text>
        </Callout.Root>
        <Flex>
          {audiences.map((audience, index) => (
            <Card
              style={{
                width: 160,
                color: "#333",
                cursor: "pointer",
                backgroundColor:
                  selectedCardIndex === index ? "lightblue" : "white",
              }}
              className="card-elevation"
              my="4"
              mx="4"
              key={index}
              data-id={index}
              onClick={handleAudienceClick}
            >
              <h2>Name: {audience.name}</h2>
              <p>Users: {audience.users.length}</p>
            </Card>
          ))}
        </Flex>
        <Button
          className="m-4 col-span-12 lg:col-span-2 w-full"
          onClick={setActiveStep}
          style={{ width: 120 }}
        >
          Next
        </Button>
      </Box>

      {isLoading && (
        <div className="p-20">
          <Loader />
        </div>
      )}
      {audiences.length < 1 && <Empty label="No audience created." />}
    </Card>
  );
};

export default SelectAudience;
