import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import style from './style.js';
import AddCustomer from '../AddCustomer';

function CustomerTable({ ...props }) {
  const { classes, customerData, currentCustomer, onClickRow, enableAdd, ...rest } = props;

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'Customer Name'}</TableCell>
            {enableAdd ? (
              <TableCell>
                <AddCustomer
                  customerData={customerData}
                  {...rest}
                />
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {customerData.map((row, index) => {
            return (
              <TableRow
                className={classes.row}
                key={index}
                hover={true}
                selected={
                  currentCustomer
                    ? row.name === currentCustomer.name
                    : false
                }
                onClick={() =>onClickRow(row)}
              >
                <TableCell>{row.name}</TableCell>
                {enableAdd ? <TableCell /> : null}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomerTable.propTypes = {
  classes: PropTypes.object.isRequired,
  customerData: PropTypes.array.isRequired,
  onClickRow: PropTypes.func.isRequired,
  currentCustomer: PropTypes.object.isRequired,
  enableAdd: PropTypes.bool.isRequired,
  newCustomer: PropTypes.object,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleCancel: PropTypes.func,
  handleFail: PropTypes.func,
  addTextToBuffer: PropTypes.func,
  addToData: PropTypes.func,
};

export default withStyles(style)(CustomerTable);
