import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import routes from 'routes';

import style from './style.js';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarOpen: false };
  }

  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Sidebar
          routes={routes}
          currentPath={this.props.location.pathname}
          open={this.state.sidebarOpen}
          toggle={this.toggleSidebar}
        />
        <main className={classes.main}>
          <Header title={this.props.title} toggleSidebar={this.toggleSidebar} />
          <div className={classes.content}>{this.props.children}</div>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  location: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default withStyles(style)(withRouter(Layout));
