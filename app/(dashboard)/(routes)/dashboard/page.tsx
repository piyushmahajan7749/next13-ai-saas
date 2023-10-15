"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { AlertDialog, Button, Card, Flex, TextField } from "@radix-ui/themes";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { Label } from "@radix-ui/react-select";
import { Plus } from "lucide-react";

export interface Project {
  name: string;
  description: string;
  id: string;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");

  const saveToFirestore = async (e: any) => {
    setLoading(true);
    if (projectName === "") {
      alert("Please enter an project name.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "projects"), {
        name: projectName, // Save the audience name
      });
      setLoading(false);
      setLoading(true);
      await getDocs(collection(db, "projects")).then((querySnapshot) => {
        const newData: Project[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Project, "id">), // Cast the data to omit the 'id' field
          id: doc.id,
        }));
        setProjects(newData);
        setLoading(false);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      await getDocs(collection(db, "projects")).then((querySnapshot) => {
        const newData: Project[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Project, "id">), // Cast the data to omit the 'id' field
          id: doc.id,
        }));
        setProjects(newData);
        setLoading(false);
      });
    };

    fetchProjects();
  }, []);

  return (
    <Card mb="8" key={projects.length}>
      <Flex direction="column" my="4" style={{ alignItems: "center" }}>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button
              style={{ width: 360 }}
              className="px-6 py-6 border-2 my-8 mb-12 ml-4 rounded-md shadow-md"
            >
              <Plus width="16" height="16" />
              Create new project
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 550 }}>
            <AlertDialog.Title>Create new project</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Add a name for this project
            </AlertDialog.Description>
            <Flex direction="column" className="my-4">
              <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
                <TextField.Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  size="2"
                  placeholder="Project name..."
                />
              </Flex>
              <Flex gap="3" my="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    onClick={saveToFirestore}
                    variant="solid"
                    color="blue"
                  >
                    Create
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
        <Flex>
          {projects.map((project, index) => (
            <Card
              variant="ghost"
              style={{
                width: 180,
                color: "#333",
                cursor: "pointer",
                alignContent: "center",
              }}
              className="card-elevation mx-4 bg-teal-200"
              key={index}
              data-id={index}
            >
              <Flex direction="column" className="justify-center">
                <h2 className="m-2 mx-4 font-semibold text-center">
                  {project.name}
                </h2>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>

      {isLoading && (
        <div className="p-20">
          <Loader />
        </div>
      )}
      {projects.length < 1 && <Empty label="No project created." />}
    </Card>
  );
}
