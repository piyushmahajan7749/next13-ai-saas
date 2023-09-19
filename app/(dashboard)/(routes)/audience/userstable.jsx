import React from "react";
import DataTable from "react-data-table-component";

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

  return <DataTable title="User Details" columns={columns} data={data} />;
};

export default UserDetailsTable;
