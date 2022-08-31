/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const TransactionTable = ({ rows }) => {
  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    "& .MuiTableCell-head": {
      backgroundColor: `${theme.palette.primary.main}`,
    },
  }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: "Time", label: "Time", minWidth: 170 },
    {
      id: "FromAddress",
      label: "From Address",
      minWidth: 200,
      maxWidth: 300,
      wordBreak: "break-word",
    },
    {
      id: "ToAddress",
      label: "To Address",
      minWidth: 200,
      maxWidth: 300,
      wordBreak: "break-word",
    },
    {
      id: "Amount",
      label: "Amount",
      minWidth: 50,
    },
    {
      id: "SendType",
      label: "Send Type",
      minWidth: 100,
    },
    {
      id: "AssetId",
      label: "Asset Id",
      minWidth: 100,
    },
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (row != undefined) {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            style={{
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                              wordBreak: column.wordBreak,
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TransactionTable.propTypes = {
  rows: PropTypes.array,
};
export default TransactionTable;
