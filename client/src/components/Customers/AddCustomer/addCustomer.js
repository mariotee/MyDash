import React from 'react';
import PropTypes from 'prop-types';

import { CountryPhoneDictionary } from 'utils/CountryPhoneDictionary.js';

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Select,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import style from './style.js';
import { Add } from '@material-ui/icons';

function AddCustomer({ ...props }) {
  const { classes } = props;

  let validateNewCustomer = (newCustomer) => {
    const { name,contact } = newCustomer;

    if ( !name || !contact ) {
      return false;
    }

    return name.length > 0 && contact.email.length > 0
  };

  let handleForm = (newCustomer) => {
    if ( props.customerData.some( (element) =>
      element.name === newCustomer.name,)) {
      window.alert('Customer Name Exists');
      props.handleFail();
    } else if (!validateNewCustomer(newCustomer)) {
      window.alert('Invalid Customer');
      props.handleFail();
    } else {
      props.addToData(newCustomer);
    }
  };  

  return (
    <div>
      <IconButton onClick={props.handleOpen}>
        <Add color="primary" />
      </IconButton>
      <Dialog open={props.open} onClose={props.handleCancel}>
        <DialogTitle>{'New Customer'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Please fill out the form below to register a new customer'}
          </DialogContentText>
          <TextField
            className={classes.input}
            autoFocus={true}
            error={
              !!(props.newCustomer.name
              && props.newCustomer.name.length === 0)
            }
            label="Customer Name"
            type="text"
            onChange={(event) => props.addTextToBuffer(event, 'name')}
          />
          <br />                    
          <TextField
            className={classes.input}
            label="Contact Email"
            error={
              !!(props.newCustomer.contact && props.newCustomer.contact.email
              && props.newCustomer.contact.email.length === 0)
            }
            type="email"
            onChange={(event) => props.addTextToBuffer(event, 'contact.email')}
          />
          <br />
          <Select
            className={classes.input}
            native={true}
            onChange={(event) =>
              props.addTextToBuffer(event, 'contact.countryCode')
            }
          >
            <option>{'Country Code'}</option>
            {CountryPhoneDictionary.map((element, index) => {
              return (
                <option key={index} value={element.dial_code}>
                  {element.name + ' (' + element.dial_code + ')'}
                </option>
              );
            })}
          </Select>
          <br />
          <TextField
            className={classes.input}
            label="Phone Number (with area code)"
            error={
              !!(props.newCustomer.contact && props.newCustomer.contact.phone
              && props.newCustomer.contact.phone.length === 0)
            }
            type="tel"
            onChange={(event) =>
              props.addTextToBuffer(event, 'contact.phone')
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            {'Cancel'}
          </Button>
          <Button
            onClick={() => handleForm(props.newCustomer)}
            color="primary"
          >
            {'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
  customerData: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleFail: PropTypes.func.isRequired,
  newCustomer: PropTypes.object.isRequired,
  addTextToBuffer: PropTypes.func.isRequired,
  addToData: PropTypes.func.isRequired,
};

export default withStyles(style)(AddCustomer);
