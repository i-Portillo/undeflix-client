import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useEffect } from 'react';

export default function DataTable({ title, headers, data, createClick, rowClick }) {

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [orderBy, setOrderBy] = useState(headers[0].id);
  const [isOrderAsc, setIsOrderAsc] = useState(true);

  const getActionIcon = (label) => {  // TODO: Probably could be deleted
    switch(label) {
      case 'Edit':
        return <Edit fontSize='small' />
      case 'Delete':
        return <Delete fontSize='small' />
      case 'Details':
        return <Visibility fontSize='small' />
      default:
        return label;
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  }

  const handleSort = (header) => {
    console.log(header, orderBy, isOrderAsc);
    if (header !== orderBy) {
      setOrderBy(header);
      setIsOrderAsc(true);
    } else {
      setIsOrderAsc( previous => !previous ); 
    }
  }

  useEffect( () => {
    setPage(0);
    setFilteredData(
      data.filter( (row) => ( (filter === '') || 
        headers.some( (header) => row[header.id].toLowerCase().includes(filter) )
      ))
      .sort( (a,b) => {
        if(a[orderBy] < b[orderBy]) return (isOrderAsc ? -1 : 1);
        else return (isOrderAsc ? 1 : -1);
      })
    );
  }, [data, filter, orderBy, isOrderAsc]);

  return (
    <Box sx={{ width: '100%' }} >
      <Paper sx={{ width: '100%', minHeight: '486px' }}>
        <Toolbar >
          <Typography variant='h4'>{title}</Typography>
          <Button color='secondary' onClick={createClick} >Add</Button>
          <TextField onChange={handleFilter}/>
        </Toolbar>
        <TableContainer >
          <Table
            size='small'
          >
            <TableHead >
              <TableRow>
                {
                  headers.map( (column, index) => {
                    return (
                      <TableCell key={column.id} >
                        <TableSortLabel 
                          active={ column.id === orderBy }
                          direction={ isOrderAsc ? 'asc' : 'desc' }
                          onClick={ () => {
                            handleSort(column.id);
                          } }
                        >
                          <Typography variant={'subtitle2'} >{column.label}</Typography>
                        </TableSortLabel>
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody >
              {
                filteredData
                .slice(10*page, 10*(page+1)).map( (row, index) => {
                  return (
                    <TableRow key={`row.${row._id}`} sx={{ "&:hover": { backgroundColor: 'primary.dark' }, cursor: 'pointer' }} onClick={() => rowClick(row)} >
                      {
                        headers.map( (column, index) => {
                          return (
                            <TableCell key={`cell.${headers[index].id}`}>
                              <Typography variant='body2'>{row[headers[index].id]}</Typography>
                            </TableCell>
                          )
                        })
                      }
                    </TableRow>
                  )
                })
              }
              <TableRow>
                <TablePagination 
                  rowsPerPageOptions={[10]}
                  page={page}
                  rowsPerPage={10}
                  count={filteredData.length}
                  onPageChange={handlePageChange}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
