import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import { fetchEnd, fetchStart, showNotification, crudGetMatching, Button } from 'react-admin';
import PropTypes from 'prop-types';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import BillTrackerTimelineCreateForm from './BillTrackerTimelineCreateForm';

class BillTrackerTimelineQuickCreateButton extends Component {
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
        <Button onClick={this.handleClick} label="ra.action.create">
          <IconContentAdd />
        </Button>
        <Dialog
          maxWidth="md"
          fullWidth
          open={showDialog}
          onClose={this.handleCloseClick}
          aria-label="Create Tracker Event"
        >
          <DialogTitle>Create Tracker Event</DialogTitle>
          <DialogContent style={{ paddingLeft: '36px', paddingRight: '36px' }}>
            <BillTrackerTimelineCreateForm {...this.props} />
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

BillTrackerTimelineQuickCreateButton.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BillTrackerTimelineQuickCreateButton);
