import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import {
  fetchEnd,
  fetchStart,
  showNotification,
  crudGetMatching,
  Button,
  UPDATE,
  REDUX_FORM_NAME,
  useNotify,
  useDataProvider
} from 'react-admin';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import BillTrackerTimelineEdit from './BillTrackerTimelineEdit';
import dataProvider from '../dataProvider';

const CreateButton = props => {
  const { record, closeModal } = props;
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const approve = () =>
    dataProvider
      .create('bill_tracker_timeline', { data: { ...record } })
      .then(response => {
        // success side effects go here
        closeModal();
        notify('New Bill Tracker Timeline step created');
      })
      .catch(error => {
        // failure side effects go here
        notify(`Error creating new Bill Tracker Timeline Step: ${error.message}`, 'warning');
      });
  return (
    <Button label="Approve" onClick={approve}>
      <SaveIcon />
    </Button>
  );
};
CreateButton.propTypes = {
  record: PropTypes.object,
  closeModal: PropTypes.func
};

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

  handleSaveClick = () => {
    const { submit } = this.props;
    // Trigger a submit of our custom quick create form
    // This is needed because our modal action buttons are oustide the form
    submit('bill_tracker_timeline_qc');
  };

  handleSubmit = values => {
    const { change, crudGetMatching, fetchStart, fetchEnd, showNotification } = this.props;

    // Dispatch an action letting react-admin know a API call is ongoing
    fetchStart();

    // As we want to know when the new post has been created in order to close the modal, we use the
    // dataProvider directly
    dataProvider(UPDATE, 'bills', { data: values })
      .then(({ data }) => {
        // Refresh the choices of the ReferenceInput to ensure our newly created post
        // always appear, even after selecting another post
        crudGetMatching(
          'bills',
          'bill_tracker_timeline@bill_id',
          { page: 1, perPage: 25 },
          { field: 'id', order: 'DESC' },
          {}
        );

        // Update the main react-admin form (in this case, the comments creation form)
        change(REDUX_FORM_NAME, 'bill_timeline_id', data.id);
        this.setState({ showDialog: false });
      })
      .catch(error => {
        showNotification(error.message, 'error');
      })
      .finally(() => {
        // Dispatch an action letting react-admin know a API call has ended
        fetchEnd();
      });
  };

  render() {
    const { showDialog } = this.state;
    return (
      <Fragment>
        <Button onClick={this.handleClick} label="ra.action.create">
          <IconContentAdd />
        </Button>
        <Dialog maxWidth="md" fullWidth open={showDialog} onClose={this.handleCloseClick}>
          <DialogTitle>Add New Tracker Event</DialogTitle>
          <DialogContent>
            <BillTrackerTimelineEdit {...this.props} />
          </DialogContent>
          <DialogActions>
            <CreateButton closeModal={this.handleCloseClick} {...this.props} />
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
  showNotification: PropTypes.bool,
  record: PropTypes.object,
  redirect: PropTypes.string,
  handleSubmit: PropTypes.func,
  save: PropTypes.func
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
