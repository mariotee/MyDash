import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from '@material-ui/core';

import style from './style.js';

class IncompleteTaskDialog extends React.Component {
  state = {}

  handleEventChangeValue = (event, parent, prop) => {
    let object = { ...this.state[parent] };
    object[prop] = event.target.value;

    this.setState({ [parent]: object });
  };

  handleToggle = (event, parent, prop) => {
    let object = { ...this.state[parent] };
    object[prop] = !this.state[parent][prop];
    this.setState({ [parent]: object });
  };
  
  render() {
    const { classes } = this.props;

    return (
      <Dialog maxWidth="sm" open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>
          <b>{`Task`}</b>
        </DialogTitle>        
        <DialogContent>          
          <Typography>
          { "What would you like to do with this task?" }
          </Typography>          
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() =>
              this.props.handleSubmit()
            }
          >
            {'Mark Complete'}
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() =>
              this.props.handleDelete()
            }
          >
            {'Delete'}
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => this.props.handleClose()}
          >
            {'Cancel'}
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

IncompleteTaskDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  leftEye: PropTypes.object.isRequired,
  rightEye: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(style)(IncompleteTaskDialog);
