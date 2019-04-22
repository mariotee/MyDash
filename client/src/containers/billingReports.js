import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as CustomerActions from 'store/Customers/actions.js';
import * as BillingActions from 'store/Billing/actions.js';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import CustomerTable from 'components/Customers/CustomerTable';
import BillingTabs from 'components/BillingReports/BillingTabs';
import BillingDaily from 'components/BillingReports/BillingMonthly';

const mapStateToProps = (state) => ({
  customerData: state.customers.data,
  billingUsageData: state.billing.data,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCustomersFromApi: () => {
    dispatch(CustomerActions.getAllCustomersFromApi());
  },
  getAllUsageFromApi: () => {
    dispatch(BillingActions.getAllUsageFromApi());
  },
});

class BillingReportsContainer extends React.Component {
  state = {
    currentCustomer: {},
  };

  componentDidMount() {
    this.props.getAllCustomersFromApi();
    this.props.getAllUsageFromApi();
  }

  onClickRow = (customer) => {
    this.setState({ currentCustomer: customer });
  };

  render() {
    /*
     *  this is an array of for tab data that will be used in the BillingTabs component;
     *  each tab container has a label, value (for pagination), and component to present;
     *  the components are separated for different terms (month,quarter,year);
     *  will ideally want to refactor into one component and take in a 'term' prop;
     *  NOTE: also thinking about refactoring the way these tabs are made. perhaps should make new component
     *        that uses 'props.children' to present the subcomponents
     */
    const TABS = [
      {
        label: 'daily',
        value: 'daily',
        component: <BillingDaily
          data={this.props.billingUsageData}
          currentCustomer={this.state.currentCustomer}
        />,
      },
    ];
    return (
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <Card style={{ height: '88vh' }}>
              <CustomerTable
                customerData={this.props.customerData}
                currentCustomer={this.state.currentCustomer}
                onClickRow={this.onClickRow}
                enableAdd={false}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card style={{ height: '88vh' }}>
              <BillingTabs tabData={TABS} indicatorColor='primary'/>
            </Card>
          </Grid>
        </Grid>
    );
  }
}

BillingReportsContainer.propTypes = {
  customerData: PropTypes.arrayOf(PropTypes.object).isRequired,
  billingUsageData: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllCustomersFromApi: PropTypes.func.isRequired,
  getAllUsageFromApi: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingReportsContainer);