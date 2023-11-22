import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";


/**
 * Get JSX list containing users.
 * @param {*} users List of users in database.
 * @param {*} heading Header for section that displays all users
 * @returns
 */

function ListUsers({users}) {
    let id = 1;
    const rows = [];


    // eslint-disable-next-line no-lone-blocks
    {users.map((user) => (
        rows.push(
          { id:id++,username: user.username,
             password: user.password,url: user.url})))}
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

export { ListUsers };

const columns = [
  {
    field: "url",
    headerName: "Website",
    width: 300,
    renderCell: (params) => (
      <a href={"https://" + params.value}>{params.value}</a>
    ),
  },
  { field: "username", headerName: "Username", width: 130 },
  { field: "password", headerName: "Password", width: 130 },
];


