import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CustomerActions from 'store/Customers/actions.js';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import TableTitle from 'components/TableTitle';
import CustomerTable from 'components/Customers/CustomerTable';
import CustomerInfo from 'components/Customers/CustomerInfo';

import * as CheckRequests from 'utils/CheckRequests.js';
import { ERROR, SUCCESS } from 'constants/status.js';

const mapStateToProps = (state) => ({
  customerData: state.customers.data,        
  customerGetStatus: state.customers.getStatus,    
  customerPostStatus: state.customers.postStatus,
  customerPutStatus: state.customers.putStatus,  
});

const mapDispatchToProps = (dispatch) => ({
    customerActions: bindActionCreators(CustomerActions, dispatch),
});

const defaultNewCustomer = {
  name: "",
  contact: {
    email: "",
  },
  subscriptionStatus: false,
}

class CustomerAccountManagementContainer extends React.Component {
  state = {
    filterCustomerData: [...this.props.customerData],
    currentCustomer: {},    
    newCustomer: {...defaultNewCustomer},
    editedCustomer: {},    
    editingCustomerInfo: false,    
    customerSaveChangesAlert: false,    
    customerDialog: false,    
  };

  componentDidMount() {
    this.props.customerActions.getAllCustomersFromApi();
  }

  componentDidUpdate(prevProps) {
    this.checkSaveChanges();
    this.checkLoaded(prevProps);
    this.checkAllGetStatus();
    this.checkCustomerPostStatus();
    this.checkCustomerPutStatus();
  }

  checkAllGetStatus = () => {    
    const getRequests = [
      this.props.customerGetStatus,      
    ];

    if ( CheckRequests.allFinished(getRequests) && CheckRequests.allFailed(getRequests) ) {
      window.alert('all GET requests failed. check to make sure web API is running');
    } else if ( CheckRequests.allFinished(getRequests) && CheckRequests.someFailed(getRequests) ) {
      window.alert('some GET requests failed. check to make sure web API is running');
    }
  }

  checkCustomerPostStatus = () => {
    if (this.props.customerPostStatus === SUCCESS) {
      console.log('success POST');
      this.props.customerActions.setPostStatusToIdle();
      this.props.customerActions.getAllCustomersFromApi();
    } else if (this.props.customerPostStatus === ERROR) {
      window.alert('failed to POST');
      this.props.customerActions.setPostStatusToIdle();
    }
  }

  checkCustomerPutStatus = () => {
    if (this.props.customerPutStatus === SUCCESS) {
      console.log('sucess PUT');
      this.props.customerActions.setPutStatusToIdle();
      this.props.customerActions.getAllCustomersFromApi();
    } else if (this.props.customerPutStatus === ERROR) {
      window.alert('failed to PUT');
      window.location.reload(); //temporary fix for UI state set even if fails to PUT
      this.props.customerActions.setPutStatusToIdle();
    }
  }  

  checkSaveChanges = () => {
    if (this.state.customerSaveChangesAlert) {
      if (window.confirm('Save Changes to Customer Info?')) {
        this.props.customerActions.updateCustomerWithApi(this.state.editedCustomer);
        this.setState({
          currentCustomer: this.state.editedCustomer,
          editedCustomer: { ...this.state.editedCustomer },
          editingCustomerInfo: false,
          customerSaveChangesAlert: false,
        });
      } else {
        this.setState({
          editedCustomer: { ...this.state.currentCustomer },
          editingCustomerInfo: false,
          customerSaveChangesAlert: false,
        });
      }
    }    
  };

  checkLoaded = (prevProps) => {
    if (this.props.customerData !== prevProps.customerData) {
      console.log('loaded customer');
      this.setState({ filterCustomerData: [...this.props.customerData] });
    }    
  };

  /*CUSTOMER HANDLERS*/
  searchCustomerName = (event) => {
    this.setState({
      filterCustomerData: this.props.customerData.filter((element) =>
        element.name.toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    });
  };

  customerClick = (customer) => {
    if (this.state.editingCustomerInfo) {
      this.setState({ customerSaveChangesAlert: true });
    }else {
      this.setState({
        currentCustomer: customer,
        editedCustomer: { ...customer },
        currentLicense: {},
      });
    }
  };

  customerAddOpen = () => {
    this.setState({ customerDialog: true });
  };

  customerAddCancel = () => {
    console.log('customer add cancel');
    this.setState({
      newCustomer: {},
      customerDialog: false,
    });
  };

  customerAddFail = () => {
    console.log('fail');
    this.setState({
      newCustomer: {},
      customerDialog: false,
    });
  };

  addTextToNewCustomerBuffer = (event, prop) => {    
    if (prop.includes(".")) {
      let key = prop.split(".")
      console.log(key[0])
      let customerBuffer = this.state.newCustomer;
      customerBuffer[key[0]][key[1]] = event.target.value;
      this.setState({ newCustomer: customerBuffer });
    } else {
      let customerBuffer = this.state.newCustomer;
      customerBuffer[prop] = event.target.value;
      this.setState({ newCustomer: customerBuffer });
    }        
  };

  customerAddToData = () => {
    this.props.customerActions.postNewCustomerWithApi(this.state.newCustomer);
    this.setState({
      newCustomer: {...defaultNewCustomer},
      customerDialog: false }
    );
  };

  handleCustomerEditToggle = () => {
    if (this.state.currentCustomer.customerName) {
this.setState({
        editingCustomerInfo: !this.state.editingCustomerInfo,
        editedCustomer: { ...this.state.currentCustomer },
      });
}
  };

  handleCustomerFieldChange = (object, prop, value) => {
    object[prop] = value;
    this.setState({ editedCustomer: object });
  };

  handleCustomerSaveChanges = () => {
    this.setState({ customerSaveChangesAlert: true });
  };

  handleCustomerCancelChanges = () => {
    this.handleCustomerEditToggle();
  };  

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} lg={6}>
          <Card style={{ height: '375px' }}>
            <TableTitle
              title='Customers'
              searchbar
              searchPlaceholder='search by name'
              searchOnChange={this.searchCustomerName}
            />
            <CustomerTable
              customerData={this.state.filterCustomerData}
              onClickRow={this.customerClick}
              currentCustomer={this.state.currentCustomer}
              enableAdd={true}
              newCustomer={this.state.newCustomer}
              addTextToBuffer={this.addTextToNewCustomerBuffer}
              open={this.state.customerDialog}
              handleOpen={this.customerAddOpen}
              handleCancel={this.customerAddCancel}
              handleFail={this.customerAddFail}
              addToData={this.customerAddToData}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card style={{ height: '375px' }}>
            <CustomerInfo
              currentCustomer={this.state.currentCustomer}
              editedCustomer={this.state.editedCustomer}
              toggleEdit={this.handleCustomerEditToggle}
              editing={this.state.editingCustomerInfo}
              onChange={this.handleCustomerFieldChange}
              onSave={this.handleCustomerSaveChanges}
              onCancel={this.handleCustomerCancelChanges}
            />
          </Card>
        </Grid>        
      </Grid>
    );
  }
}

CustomerAccountManagementContainer.propTypes = {
  customerData: PropTypes.arrayOf(PropTypes.object).isRequired,      
  updateCustomer: PropTypes.func.isRequired,  
  postNewCustomer: PropTypes.func.isRequired,  
};

export default connect(mapStateToProps,mapDispatchToProps,)(CustomerAccountManagementContainer);