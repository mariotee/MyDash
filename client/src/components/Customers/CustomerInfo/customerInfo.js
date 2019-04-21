import React from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { IconButton, Switch } from '@material-ui/core';
import { Edit, Save, Cancel } from '@material-ui/icons';

import style from './style.js';

function CustomerInfo({ ...props }) {
  const { classes } = props;
    
  return (
    <div className={classes.root}>
      <Typography variant="title">
        {'Customer Info'}
        {!props.editing ? (
          <IconButton onClick={props.toggleEdit}>
            <Edit />
          </IconButton>
        ) : (
          <span>
            <IconButton onClick={props.onCancel}>
              <Cancel color="error" />
            </IconButton>
            <IconButton onClick={props.onSave}>
              <Save />
            </IconButton>
          </span>
        )}
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">{'Customer Id'}</TableCell>
            <TableCell>
              {props.currentCustomer ? props.currentCustomer._id : ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{'Contact Email'}</TableCell>
            <TableCell>
              {props.currentCustomer && props.currentCustomer.contact ? props.currentCustomer.contact.email : ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{'Contact Country Code'}</TableCell>
            <TableCell>
              {props.currentCustomer && props.currentCustomer.contact
                ? props.currentCustomer.contact.countryCode
                : ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{'Contact Phone Number'}</TableCell>
            <TableCell>
              {props.currentCustomer && props.currentCustomer.contact
                ? props.currentCustomer.contact.phone
                : ''}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">{'Subscription Status'}</TableCell>
            <TableCell>
              {props.currentCustomer.subscriptionStatus === undefined ? (
                ''
              ) : props.editing ? (
                <Switch
                  color="primary"
                  disabled={false}
                  checked={props.editedCustomer.subscriptionStatus}
                  onChange={(event) =>
                    props.onChange(
                      props.editedCustomer,
                      'active',
                      event.target.checked,
                    )
                  }
                />
              ) : (
                <Switch
                  color="primary"
                  disabled={true}
                  checked={props.currentCustomer.subscriptionStatus}
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

CustomerInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  currentCustomer: PropTypes.object,
  editedCustomer: PropTypes.object,
  editing: PropTypes.bool.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(style)(CustomerInfo);