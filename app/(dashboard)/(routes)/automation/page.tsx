"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LucideBadgeDollarSign, Send } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/api/firebase/firebase";
import { Box, Card, Container, Flex, Grid } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";
import ConfigureMessage from "../configuremessage/page";

const AutomationsPage = () => {
  const router = useRouter();

  const [audiences, setAudiences] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleAudienceClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const idx = e.currentTarget.getAttribute("data-id");
    setSelectedAudience(audiences[parseInt(idx || "-1")]);
    setSelectedCardIndex(idx);
  };

  const onSubmit = async (e: React.FormEvent) => {
    if (selectedAudience) {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    const fetchAudiences = async () => {
      await getDocs(collection(db, "audiences")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAudiences(newData);
      });
    };

    fetchAudiences();
  }, []);

  return (
    <Container size="4" className="px-4 lg:px-8">
      <Heading
        title="Automation"
        description="Start a Cold DM Automation"
        icon={LucideBadgeDollarSign}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      {!showMessage ? (
        <Box>
          <Card my="4">
            <Grid gap="3">
              <Label>
                <b>Select Audience</b>
              </Label>
              <Flex>
                {audiences.map((audience, index) => (
                  <Card
                    style={{
                      width: 160,
                      color: "#333",
                      cursor: "pointer",
                      backgroundColor:
                        selectedCardIndex === index.toString()
                          ? "lightblue"
                          : "white",
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
            </Grid>
          </Card>
          <Button
            className="col-span-12 lg:col-span-2 w-full"
            type="submit"
            onClick={onSubmit}
            style={{ width: 120 }}
            size="icon"
          >
            Next
          </Button>
        </Box>
      ) : (
        <ConfigureMessage audience={selectedAudience} />
      )}
      {audiences.length < 1 && <Empty label="No audience created." />}
    </Container>
  );
};

export default AutomationsPage;
