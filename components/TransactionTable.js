import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { makeStyles } from '@mui/styles'
import getTheme from '@/themes/getTheme'
const theme = getTheme('normal')

const useStyles = makeStyles({
  root: {
    '& .MuiTableCell-head': {
      backgroundColor: `${theme.palette.primary.main}`,
    },
  },
})

export const TransactionTable = ({ rows }) => {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const columns = [
    { id: 'Time', label: 'Time', minWidth: 170 },
    { id: 'FromAddress', label: 'From Address', minWidth: 200 },
    {
      id: 'ToAddress',
      label: 'To Address',
      minWidth: 200,
    },
    {
      id: 'Amount',
      label: 'Amount',
      minWidth: 50,
    },
    {
      id: 'SendType',
      label: 'Send Type',
      minWidth: 100,
    },
    {
      id: 'AssetId',
      label: 'Asset Id',
      minWidth: 100,
    },
  ]
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.root}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                if(row != undefined){
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.time}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
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
  )
}
