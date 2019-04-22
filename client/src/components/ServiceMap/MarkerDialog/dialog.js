import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogContent } from '@material-ui/core/';
import { Button, FormLabel, FormControlLabel, Radio } from '@material-ui/core';

function MarkerDialog({ ...props }) {
  return (
    <Dialog open={props.open} onClose={() => props.closeDialog()}>
      <DialogTitle>
        <b>{'My Service'}</b>
      </DialogTitle>
      <DialogContent>
        <p>
          {`
            This service is located in:
            ${props.currentLocation.city},            
            ${props.currentLocation.country}
          `}
          <br/>
          {`Current Status: ${props.currentLocation.status}`}
        </p>
        <br />
        <FormLabel>{'Change the Status Manually'}</FormLabel>
        <br />
        <FormControlLabel
          label="Running"
          control={
            <Radio
              color="primary"
              checked={props.editedLocation.status === 'Running'}
              value="Running"
              onClick={(event) => props.handleRadio(event)}
            />
          }
        />
        <FormControlLabel
          label="Busy"
          control={
            <Radio
              color="primary"
              checked={props.editedLocation.status === 'Busy'}
              value="Busy"
              onClick={(event) => props.handleRadio(event)}
            />
          }
        />
        <FormControlLabel
          label="Down"
          control={
            <Radio
              color="primary"
              checked={props.editedLocation.status === 'Down'}
              value="Down"
              onClick={(event) => props.handleRadio(event)}
            />
          }
        />
        <br/>
        <Button
          style={{margin: "8px"}}
          variant="contained"
          onClick={() => props.closeDialog()}
        >
          {'Cancel'}
        </Button>        
        <Button         
          style={{margin: "8px"}} 
          variant="contained"
          onClick={() => props.submitChange()}
        >
          {'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

MarkerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  currentLocation: PropTypes.object.isRequired,
  editedLocation: PropTypes.object.isRequired,
  handleRadio: PropTypes.func.isRequired,
  submitChange: PropTypes.func.isRequired,
};

export default MarkerDialog;