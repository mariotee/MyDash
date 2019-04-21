import React from 'react';

import Grid from '@material-ui/core/Grid';

import Layout from 'layout';
import BillingContainer from 'containers/billingReports.js';

class BillingReports extends React.Component {
  render() {
    return (
      <Layout title="Billing And Reports Tool">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <BillingContainer/>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default BillingReports;
