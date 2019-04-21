import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import style from './styles';

class Sidebar extends React.Component {
  render() {
    const { classes } = this.props;

    const logoHeader = (
      <div className={classes.sidebartop}>
        My Dash
      </div>
    );

    const listOfLinks = (
      <List>
        {this.props.routes.map((element, index) => {
          return (
            <ListItem key={index} className={classes.item}>
              <NavLink to={element.path}
                className={classnames({
                  [classes.itemLink]: true,
                  [classes.itemActive]: this.props.currentPath === element.path,
}
                )}>
                <ListItemIcon className={classes.itemIcon}>
                  <element.icon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={element.name}
                  className={classes.itemText}
                />
              </NavLink>
            </ListItem>
          );
        })
      }
      </List>
    );

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            open={this.props.open}
            anchor="left"
            variant="temporary"
            onClose={this.props.toggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }} //for mobile
          >
            <div className={classes.sidebarWrapper}>
              {logoHeader}
              {listOfLinks}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            open={this.props.open}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.sidebarWrapper}>
              {logoHeader}
              {listOfLinks}
            </div>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}
Sidebar.propTypes = {
  classes: PropTypes.object,
  routes: PropTypes.arrayOf(PropTypes.object),
  currentPath: PropTypes.string,
  open: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default withStyles(style)(Sidebar);