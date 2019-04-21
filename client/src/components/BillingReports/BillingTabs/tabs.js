import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core';
import style from './style.js';

class BillingTabs extends React.Component {
  state = { value: this.props.tabData[0].value }

  handleChange = (event,value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return <div className={this.props.classes.root}>
      <Tabs
        fullWidth
        scrollable
        indicatorColor={this.props.indicatorColor}
        value={value}
        onChange={this.handleChange}
      >
      {this.props.tabData.map((element,index) =>
        <Tab key={index} label={element.label} value={element.value}/>
      )}
      </Tabs>
      {/*would throw if component is undefined or not a functional component*/}
      {/*and it SHOULD throw because otherwise breaks design*/}
      {this.props.tabData.find((element)=>element.value === this.state.value).component}
    </div>;
  }
}

BillingTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  indicatorColor: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      component: PropTypes.element.isRequired,
    }).isRequired
  ).isRequired,
};

BillingTabs.defaultProps = { indicatorColor: 'secondary' };

export default withStyles(style)(BillingTabs);
