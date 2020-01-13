import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

class ColoredLinearProgress extends Component {
  render() {
    const { classes } = this.props;
    return <LinearProgress {...this.props} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>;
  }
}

const styles = props => ({
  colorPrimary: {
    backgroundColor: '#FD8907',
  },
  barColorPrimary: {
    backgroundColor: '#EEC291',
  }
});

export default  withStyles(styles)(ColoredLinearProgress);