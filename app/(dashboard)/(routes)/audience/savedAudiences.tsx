// components/FetchAudiences.js

import { db } from "@/app/api/firebase/firebase";
import { Heading } from "@/components/heading";
import { Card, Container, Flex } from "@radix-ui/themes";
import { collection, getDocs } from "firebase/firestore";
import { Users } from "lucide-react";
import React, { useState, useEffect } from "react";

const SavedAudiences = () => {
  const [audiences, setAudiences] = useState([]);

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
    <Container size="4">
      <Flex direction="column">
        <ul>
          {audiences.map((audience, index) => (
            <li key={index}>
              <Card style={{ width: 160 }} my="4" mx="4">
                <h2>Name: {audience.name}</h2>
                <p>Users: {audience.users.length}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Flex>
    </Container>
  );
};

export default SavedAudiences;
