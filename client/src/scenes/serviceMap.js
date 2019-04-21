import React from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

import ServiceMapContainer from 'containers/serviceMap'

import Layout from 'layout';

class ServiceMap extends React.Component {
  render() {
    return (
      <Layout title="Service Monitor">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card style={{ height: '800px' }}>
              <ServiceMapContainer />
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default ServiceMap;
