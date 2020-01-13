import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import '../css/ColouredCircularProgress.css';

class ColoredCircularProgress extends Component {
  render() {
    const { classes } = this.props;
    return <CircularProgress {...this.props} classes={{colorPrimary: classes.colorPrimary}}/>;
  }
}

export default  withStyles()(ColoredCircularProgress);