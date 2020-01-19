import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

const defaultSize = 50;

class ColoredCircularProgress extends Component {

    render() {
      const { classes, size, percentage } = this.props;
      return <CircularProgress {...this.props} classes={classes} size={size} />;
    }
  }
  
  const styles = ({ size = defaultSize , percentage = 50}) => ({
    colorPrimary: {
      color: '#FD8907'
    },
    root: {
      top: `calc(${percentage}% - ${size / 2}px)`,
      left: `calc(${percentage}% - ${size / 2}px)`,
      position: 'absolute'
    }
  });
  
  ColoredCircularProgress.propTypes = {
    classes: PropTypes.object,
    size: PropTypes.number
  };
  ColoredCircularProgress.defaultProps = {
    size: defaultSize
  };

  export default withStyles(styles)(ColoredCircularProgress);