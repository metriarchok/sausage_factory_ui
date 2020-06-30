import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import { fetchEnd, fetchStart, showNotification, crudGetMatching, Button } from 'react-admin';
import PropTypes from 'prop-types';
import IconCancel from '@material-ui/icons/Cancel';
import { Dialog, IconButton, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import BillTrackerTimelineEditForm from './BillTrackerTimelineEditForm';

import BorderColorIcon from '@material-ui/icons/BorderColor';

class BillTrackerTimelineQuickEditButton extends Component {
  state = {
    error: false,
    showDialog: false
  };

  handleClick = () => {
    this.setState({ showDialog: true });
  };

  handleCloseClick = () => {
    this.setState({ showDialog: false });
  };

  render() {
    const { showDialog } = this.state;

    return (
      <Fragment>
        <IconButton onClick={this.handleClick} label="ra.action.edit">
          <BorderColorIcon />
        </IconButton>

        <Dialog
          maxWidth="md"
          fullWidth
          open={showDialog}
          onClose={this.handleCloseClick}
          aria-label="Edit Tracker Event"
        >
          <DialogTitle>Create Tracker Event</DialogTitle>
          <DialogContent style={{ paddingLeft: '36px', paddingRight: '36px' }}>
            <BillTrackerTimelineEditForm {...this.props} />
          </DialogContent>
          <DialogActions>
            <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

BillTrackerTimelineQuickEditButton.propTypes = {
  submit: PropTypes.func,
  change: PropTypes.func,
  crudGetMatching: PropTypes.func,
  fetchStart: PropTypes.func,
  fetchEnd: PropTypes.func,
  showNotification: PropTypes.bool
};

const mapStateToProps = state => ({
  isSubmitting: isSubmitting('bill_tracker_timeline_qc')(state)
});

const mapDispatchToProps = {
  change,
  crudGetMatching,
  fetchEnd,
  fetchStart,
  showNotification,
  submit
};

export default connect(mapStateToProps, mapDispatchToProps)(BillTrackerTimelineQuickEditButton);
