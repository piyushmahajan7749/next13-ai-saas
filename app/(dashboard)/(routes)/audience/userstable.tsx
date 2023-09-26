import { db } from "@/app/api/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NumericFormat } from "react-number-format";

import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SavedAudiences from "./savedAudiences";
import { Label } from "@radix-ui/react-label";
import { Plus, X } from "lucide-react";

type VariableChipProps = {
  label: string;
  value: string;
  onClick: (label: string) => void;
};

const VariableChip: React.FC<VariableChipProps> = ({
  label,
  value,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      onClick={() => onClick(value)}
      className="px-4 py-2 mr-2 my-2 w-1/2"
      style={{ justifyContent: "space-between" }}
    >
      {label} <X width="16" height="16" />
    </Button>
  );
};

const UserDetailsTable: React.FC<{
  formData: any;
  setFormData: (value: any) => void;
  setActiveStep: (value: any) => void;
}> = ({ formData, setFormData, setActiveStep }) => {
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

  const [showLocationInput, setShowLocationInput] = useState(false);
  const [locationValue, setLocationValue] = useState("");
  const [locationValues, setLocationValues] = useState([]);
  const [showBioInput, setShowBioInput] = useState(false);
  const [bioValue, setBioValue] = useState("");
  const [bioValues, setBioValues] = useState([]);
  const [showExcludeBioInput, setShowExcludeBioInput] = useState(false);
  const [excludeBioValue, setExcludeBioValue] = useState("");
  const [excludeBioValues, setExcludeBioValues] = useState([]);

  const [filteredData, setFilteredData] = useState(formData.usersData); // New state for filtered data

  useEffect(() => {
    let newFilteredData = formData.usersData;
    if (bioValues.length > 0) {
      newFilteredData = newFilteredData.filter((user) =>
        bioValues.every((bioValue) =>
          user.description.toLowerCase().includes(bioValue.toLowerCase())
        )
      );
    }

    if (excludeBioValues.length > 0) {
      newFilteredData = newFilteredData.filter((user) =>
        excludeBioValues.every(
          (excludeBioValue) =>
            !user.description
              .toLowerCase()
              .includes(excludeBioValue.toLowerCase())
        )
      );
    }

    if (locationValues.length > 0) {
      newFilteredData = newFilteredData.filter((user) =>
        locationValues.every((locationValue) =>
          user.location?.toLowerCase().includes(locationValue.toLowerCase())
        )
      );
    }

    setFilteredData(newFilteredData);
  }, [bioValues, excludeBioValues, locationValues, formData.usersData]);

  const handleAddLocation = async (e: any) => {
    e.preventDefault();
    setLocationValues([...locationValues, locationValue]);
    setLocationValue("");
    setShowLocationInput(false);
  };

  const handleAddBio = async (e: any) => {
    e.preventDefault();
    setBioValues([...bioValues, bioValue]);
    setBioValue("");
    setShowBioInput(false);
  };

  const handleAddExcludeBio = async (e: any) => {
    e.preventDefault();
    setExcludeBioValues([...excludeBioValues, excludeBioValue]);
    setExcludeBioValue("");
    setShowExcludeBioInput(false);
  };

  const handleRemoveLocation = (indexToRemove) => {
    setLocationValues(
      locationValues.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemoveBio = (indexToRemove) => {
    setBioValues(bioValues.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveExcludeBio = (indexToRemove) => {
    setExcludeBioValues(
      excludeBioValues.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleNextClick = async (e: any) => {
    e.preventDefault();
    setFormData((prevState: any) => ({
      ...prevState,
      usersData: filteredData,
    }));
    setActiveStep(2);
  };

  return (
    <Flex direction="column">
      <Card mb="4">
        <Callout.Root className="mx-4 my-6">
          <Callout.Text className="text-6xl font-bold">
            2. Apply Filters
          </Callout.Text>
        </Callout.Root>
        <Label className="text-md font-semibold mx-6">
          Apply filters to your audience
        </Label>
        <Flex>
          <Card
            size="3"
            m="5"
            className="shadow-md cursor-pointer"
            variant="surface"
            onClick={() => setShowBioInput(true)}
          >
            <Flex direction="column">
              <Flex>
                <Box style={{ maxWidth: 220 }} className="bg-gray-30">
                  <Flex direction="column" gap="3">
                    <Label className="font-bold">Bio Contents</Label>
                    <Label>Filter audience by the content of their bio</Label>
                  </Flex>
                </Box>
                <Plus
                  color="black"
                  height="30"
                  width="30"
                  style={{ marginLeft: "25px", marginTop: "25px" }}
                />
              </Flex>
              {showBioInput && (
                <div className="flex items-center my-4 space-x-2">
                  <TextField.Input
                    type="text"
                    className="p-2"
                    placeholder="Bio Content"
                    value={bioValue}
                    onChange={(e) => setBioValue(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2 ml-4"
                    onClick={handleAddBio}
                  >
                    Add
                  </button>
                </div>
              )}
              {bioValues.length > 0 &&
                bioValues.map((variable, i) => (
                  <VariableChip
                    key={i}
                    label={variable}
                    value={variable || ""}
                    onClick={() => handleRemoveBio(i)}
                  />
                ))}
            </Flex>
          </Card>
          <Card
            size="3"
            m="5"
            className="shadow-md cursor-pointer"
            variant="surface"
            onClick={() => setShowExcludeBioInput(true)}
          >
            <Flex direction="column">
              <Flex>
                <Box style={{ maxWidth: 220 }} className="bg-gray-30">
                  <Flex direction="column" gap="3">
                    <Label className="font-bold">Exclude Bio Contents</Label>
                    <Label>Exclude audience by the content of their bio</Label>
                  </Flex>
                </Box>
                <Plus
                  color="black"
                  height="30"
                  width="30"
                  style={{ marginLeft: "25px", marginTop: "25px" }}
                />
              </Flex>
              {showExcludeBioInput && (
                <div className="flex items-center my-4 space-x-2">
                  <TextField.Input
                    type="text"
                    className="p-2"
                    placeholder="Exclude Bio Content"
                    value={excludeBioValue}
                    onChange={(e) => setExcludeBioValue(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2 ml-4"
                    onClick={handleAddExcludeBio}
                  >
                    Add
                  </button>
                </div>
              )}
              {excludeBioValues.length > 0 &&
                excludeBioValues.map((variable, i) => (
                  <VariableChip
                    key={i}
                    label={variable}
                    value={variable || ""}
                    onClick={() => handleRemoveExcludeBio(i)}
                  />
                ))}
            </Flex>
          </Card>
          <Card
            size="3"
            m="5"
            className="shadow-md cursor-pointer"
            variant="surface"
            onClick={() => setShowLocationInput(true)}
          >
            <Flex direction="column">
              <Flex>
                <Box style={{ maxWidth: 220 }} className="bg-gray-30">
                  <Flex direction="column" gap="3">
                    <Label className="font-bold">Locations</Label>
                    <Label>Filter audience by location</Label>
                  </Flex>
                </Box>
                <Plus
                  color="black"
                  height="30"
                  width="30"
                  style={{ marginLeft: "25px", marginTop: "25px" }}
                />
              </Flex>
              {showLocationInput && (
                <div className="flex items-center my-4 space-x-2">
                  <TextField.Input
                    type="text"
                    className="p-2"
                    placeholder="Locations"
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white rounded px-4 py-2 ml-4"
                    onClick={handleAddLocation}
                  >
                    Add
                  </button>
                </div>
              )}
              {locationValues.length > 0 &&
                locationValues.map((variable, i) => (
                  <VariableChip
                    key={i}
                    label={variable}
                    value={variable || ""}
                    onClick={() => handleRemoveLocation(i)}
                  />
                ))}
            </Flex>
          </Card>
        </Flex>
      </Card>
      <Card mb="8">
        <Flex justify="between" align="center">
          <Flex gap="3">
            <Label className="font-bold ml-6">Audience Size:</Label>
            <NumericFormat
              value={filteredData.length}
              thousandSeparator=","
              thousandsGroupStyle="thousand"
            />
          </Flex>
          <Button
            my="4"
            mr="6"
            style={{ width: 120 }}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Flex>
      </Card>
      <Card mb="8">
        <DataTable title="User Details" columns={columns} data={filteredData} />
      </Card>
    </Flex>
  );
};

export default UserDetailsTable;
