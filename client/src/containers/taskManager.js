import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TaskManagerActions from 'store/TaskManager/actions';

import IncompleteTaskDialog from 'components/TaskManager/IncompleteTaskDialog';
import IncompleteTasksList from 'components/TaskManager/IncompleteTasksList';

import { DIALOG_CLOSED, DIALOG_OPEN } from 'constants/status';
import { ERROR, SUCCESS } from 'constants/status.js';

const mapStateToProps = (state) => ({
  data: state.taskManager.data,
  getStatus: state.taskManager.getStatus,
  deleteStatus: state.taskManager.deleteStatus,
  postStatus: state.taskManager.postStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getAllIncompleteTasksFromApi: () => {
    dispatch(TaskManagerActions.getAllIncompleteTasksFromApi());
  },
  deleteIncompleteTaskWithApi: (task) => {
    dispatch(TaskManagerActions.deleteIncompleteTaskWithApi(task));
  },
  setDeleteStatusToIdle: () => {
    dispatch(TaskManagerActions.setDeleteStatusToIdle());
  },
  postCompletedTaskWithApi: (task) => {
    dispatch(TaskManagerActions.postCompletedTaskWithApi(task));
  },
  setPostStatusToIdle: () => {
    dispatch(TaskManagerActions.setPostStatusToIdle());
  },
});

class TaskManagerContainer extends React.Component {
  componentDidMount() {
    this.props.getAllIncompleteTasksFromApi();    
  }

  componentDidUpdate() {
    if (this.props.getStatus === ERROR) {      
      window.alert('failed to GET. make sure web api server is running');
    }

    if (this.props.deleteStatus === SUCCESS) {
      this.props.setDeleteStatusToIdle();
      this.props.getAllIncompleteTasksFromApi();
      this.setState({
        currentTask: null,
      });
    } else if (this.props.deleteStatus === ERROR) {
      window.alert('failed to DELETE');
      this.props.setDeleteStatusToIdle();
    }

    if (this.props.postStatus === SUCCESS) {
      this.props.setPostStatusToIdle();
      this.props.deleteIncompleteTaskWithApi(this.state.currentTask);
    } else if (this.props.postStatus === ERROR) {
      window.alert('failed to POST. check web api for error messages');
      this.props.setPostStatusToIdle();
    }
  }

  state = {
    currentTask: {},
    dialog: DIALOG_CLOSED,    
  };

  openTask = (task) => {
    this.setState({
      currentTask: task,
      dialog: DIALOG_OPEN,
    });
  }

  closeDialog = () => {
    this.setState({
      dialog: DIALOG_CLOSED,      
    });
  }

  handleSubmit = () => {
    
  };  

  render() {
    const { data } = this.props;
    const { dialog, currentTask, } = this.state;

    return (
      <div>
        <IncompleteTasksList
          data={data}
          currentTask={currentTask}
          handleOpen={this.openTask}
        />
        <IncompleteTaskDialog
          maxWidth="sm"
          open={dialog}
          onClose={this.closeDialog}
          data={data}
          currentTask={currentTask}          
          handleSubmit={this.handleSubmit}
          handleClose={this.closeDialog}
        />
      </div>
    )
  }
}

TaskManagerContainer.propTypes = {
  data: PropTypes.array.isRequired,
  getStatus: PropTypes.string.isRequired,
  deleteStatus: PropTypes.string.isRequired,
  postStatus: PropTypes.string.isRequired,
  getAllIncompleteTasksFromApi: PropTypes.func.isRequired,
  deleteIncompleteTaskWithApi: PropTypes.func.isRequired,
  setDeleteStatusToIdle: PropTypes.func.isRequired,
  postCompletedTaskWithApi: PropTypes.func.isRequired,
  setPostStatusToIdle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskManagerContainer)