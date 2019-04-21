import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import style from './style.js';

function IncompleteTasksTable({ ...props }) {
  const { classes } = props;

  return (
    <Table className={classes.root}>      
      <TableHead>
        <TableRow>          
          <TableCell className={classes.head}>{'Task'}</TableCell>
          <TableCell className={classes.head}>{'Due Date'}</TableCell> 
          <TableCell className={classes.head}>{'Priority'}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((row, index) => {          
          return (
            <TableRow
              className={classes.row}
              key={index}
              hover={true}
              selected={
                props.currentTask
                  ? props.currentTask._id === row._id
                  : false
              }
              onClick={() => props.handleOpen(row)}
            >
              <TableCell className={classes.cell}>{row.title}</TableCell>
              <TableCell className={classes.cell}>
              {
                new Date(row.dateDue).toDateString()
              }
              </TableCell>
              <TableCell className={classes.cell}>{row.priority}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

IncompleteTasksTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  currentTask: PropTypes.object.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withStyles(style)(IncompleteTasksTable);