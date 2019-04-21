import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ServiceMapActions from 'store/ServiceMap/actions'

import DimensionsWrapper from 'react-container-dimensions'
import ServiceMap from 'components/ServiceMap/Map'
import MarkerDialog from 'components/ServiceMap/MarkerDialog'

import { DIALOG_CLOSED, DIALOG_OPEN } from 'constants/status'
import { SUCCESS, ERROR } from 'constants/status'

const mapStateToProps = (state) => ({
  data: state.serviceMap.data,
  loaded: state.serviceMap.loaded,
  getStatus: state.serviceMap.getStatus,
  putStatus: state.serviceMap.putStatus,
})

const mapDispatchToProps = (dispatch) => ({
  getAllServiceLocationsFromApi: () => {
    dispatch(ServiceMapActions.getAllServiceLocationsFromApi());
  },
  updateServiceStatusWithApi: (serviceLocation) => {
    dispatch(ServiceMapActions.updateServiceStatusWithApi(serviceLocation));
  },
  setPutStatusToIdle: () => {
    dispatch(ServiceMapActions.setPutStatusToIdle());
  },
});

class ServiceMapContainer extends React.Component {
  state = {
    currentLocation: {},
    editedLocation: {},
    dialog: DIALOG_CLOSED,
  };

  componentDidMount() {
    this.props.getAllServiceLocationsFromApi();
  }

  componentDidUpdate() {
    if (this.props.getStatus === ERROR) {
      window.alert('failed to GET. make sure web api server is running');
    }

    if (this.props.putStatus === SUCCESS) {
      this.props.setPutStatusToIdle();
      this.props.getAllServiceLocationsFromApi();
    } else if (this.props.putStatus === ERROR) {
      window.alert('failed to PUT');
      this.props.setPutStatusToIdle();
    }
  }

  clickMarker = (object) => {
    this.setState({
      currentLocation: object,
      editedLocation: { ...object },
      dialog: DIALOG_OPEN,
    });
  };

  handleRadio = (event) => {
    this.setState({
      editedLocation: {
        ...this.state.editedLocation,
        status: event.target.value,
      },
    });
  };

  closeDialog = () => {
    this.setState({
      dialog: DIALOG_CLOSED,
      currentLocation: {},
      editedLocation: {},
    });
  };

  submitChange = () => {
    this.props.updateServiceStatusWithApi(this.state.editedLocation);
    this.closeDialog();
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        <DimensionsWrapper>
          <ServiceMap data={this.props.data} clickMarker={this.clickMarker} />
        </DimensionsWrapper>
        <MarkerDialog
          open={this.state.dialog}
          closeDialog={this.closeDialog}
          currentLocation={this.state.currentLocation}
          editedLocation={this.state.editedLocation}
          handleRadio={this.handleRadio}
          submitChange={this.submitChange}
        />
      </div>
    );
  }
}

ServiceMapContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  getStatus: PropTypes.string.isRequired,
  putStatus: PropTypes.string.isRequired,
  getAllServiceLocationsFromApi: PropTypes.func.isRequired,
  updateServiceStatusWithApi: PropTypes.func.isRequired,
  setPutStatusToIdle: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceMapContainer);
