import React from 'react';

import Layout from 'layout';
import CustomersManagerContainer from 'containers/customersManager.js';

class CustomerAccountManagement extends React.Component {
  render() {
    return (
      <Layout title="Customers Manager">
        <CustomersManagerContainer/>
      </Layout>
    );
  }
}

export default CustomerAccountManagement;
