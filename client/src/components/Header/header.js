import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import style from './style';

class Header extends React.Component {
  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display1" color="primary" className={classes.header}>
          {title}
        </Typography>
        <Hidden mdUp>
          <Button
            className={classes.button}
            onClick={this.props.toggleSidebar}
            variant="fab"
            color="primary"
            aria-label="menu"
          >
            <Menu />
          </Button>
        </Hidden>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
};

export default withStyles(style)(Header);
