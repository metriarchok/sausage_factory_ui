import React, { Fragment, useState } from 'react';
import { DeleteButton } from 'react-admin';
import { Dialog, Button, DialogTitle, DialogContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const BillTrackerTimelineDeleteButton = props => {
  const [showDialog, setShowDialog] = useState();
  const { tlRecord } = props;

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };
  return (
    <Fragment>
      <Button onClick={handleClick} label="ra.action.create">
        <DeleteIcon />
      </Button>
      <Dialog maxWidth="sm" open={showDialog} onClose={handleCloseClick} aria-label="Delete Tracker Event">
        <DialogTitle>Delete this item?</DialogTitle>
        <DialogContent style={{ padding: '20px' }}>
          <Button label="ra.action.cancel" onClick={handleCloseClick}>
            Cancel
          </Button>
          <DeleteButton
            redirect={`/bills/${tlRecord.bill_id}/show/1`}
            undoable
            id={tlRecord.id}
            resource="bill_tracker_timeline"
            record={tlRecord}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
BillTrackerTimelineDeleteButton.propTypes = {
  tlRecord: PropTypes.object
};

export default BillTrackerTimelineDeleteButton;
