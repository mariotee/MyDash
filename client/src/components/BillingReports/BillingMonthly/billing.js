import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import style from './style.js';

function BillingMonthly({ ...props }) {
  const { classes } = props;

  const usage = props.data.filter(
    (element) => element.customerName === props.currentCustomer.name) || [];  
  console.log(usage)
  return (
    <div className={classes.tableWrapper}>
      <Table>
        <TableHead>
          <TableRow>                                    
            <TableCell>{'DateTime Issued'}</TableCell>
            <TableCell>{'Usage'}</TableCell>
            <TableCell>{'Unit Price'}</TableCell>
            <TableCell>{'Total Bill'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          usage.map((element, index) => {
            return (
              <TableRow key={index} className={classes.row}>
                <TableCell>{new Date(element.dateIssued).toISOString().slice(0,-5)}</TableCell>
                <TableCell>{element.usageInMegabytes} MB</TableCell>
                <TableCell>{element.unitPricePerMegabyteUsd}</TableCell>
                <TableCell>
                  ${element.usageInMegabytes * element.unitPricePerMegabyteUsd}
                </TableCell>
              </TableRow>
            );
          })
        }
        </TableBody>
      </Table>
    </div>
  );
}
/*
 * currentCustomer must have been initialised as empty
 * can be passed into BillingPage as empty or certain shape
 */
BillingMonthly.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCustomer: PropTypes.object,
};

export default withStyles(style)(BillingMonthly);