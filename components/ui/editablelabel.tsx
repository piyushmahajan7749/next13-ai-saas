import { Label } from "@radix-ui/react-label";
import { Button, Container, TextArea } from "@radix-ui/themes";
import React, { useState } from "react";

type EditableLabelProps = {
  initialPrompt: string;
};

const EditableLabel: React.FC<EditableLabelProps> = ({ initialPrompt }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState(initialPrompt);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you can also send the updated 'prompt' to the server or perform other actions
  };

  return (
    <Container style={{ width: 400, position: "relative" }} mb="4" mt="2">
      <Button
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={isEditing ? handleSaveClick : handleEditClick}
      >
        {isEditing ? "Save" : "Edit"}
      </Button>

      {isEditing ? (
        <TextArea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      ) : (
        <Label>{prompt}</Label>
      )}
    </Container>
  );
};

export default EditableLabel;
