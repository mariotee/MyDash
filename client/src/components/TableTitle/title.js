import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { withStyles } from '@material-ui/core';
import style from './style.js';

function TableTitle({ ...props }) {
  const {
    classes,
    title,
    color,
    searchbar,
    searchPlaceholder,
    searchOnChange,
  } = props;

  return <div className={classes.tableTitle}>
    <Typography variant="title" color={color}>{title}</Typography>
    {searchbar && <Input
      className={classes.searchbar}
      placeholder={searchPlaceholder}
      endAdornment={<Search color="action"/>}
      onChange={(event) => searchOnChange(event)}
    />}
  </div>;
}

TableTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  color: PropTypes.oneOf([
    'default', 'inherit',
    'primary', 'secondary',
    'textSecondary','error',
  ]),
  searchbar: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchOnChange: PropTypes.func,
};

TableTitle.defaultProps = { color: 'default' };

export default withStyles(style)(TableTitle);
