import React, { Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import BillTrackerTimelineCreateForm from './BillTrackerTimelineCreateForm';

// the parent component (Edit or Create) injects these props to their child
const BillTrackerTimelineQuickCreateButton = props => {
  const { currentTrackerItem, tlRecord } = props;
  console.log('button');
  console.log(tlRecord);

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async values => {
    const createMeta = { createdAt: new Date(), updatedAt: new Date() };
    const saveRecord = { ...createMeta, ...values };

    console.log(saveRecord);
  };

  return (
    <Fragment>
      <Button onClick={() => setShowDialog(true)}>Create</Button>
      <Dialog
        maxWidth="md"
        style={{
          minHeight: '450px',
          padding: '18px',
          '>div.MuiDialog-paperWidthMd': {
            maxHeight: '500px'
          }
        }}
        fullWidth
        open={showDialog}
        onClose={() => setShowDialog(false)}>
        <DialogTitle>Add New Tracker Event</DialogTitle>
        <DialogContent>
          <BillTrackerTimelineCreateForm
            onSubmit={onSubmit}
            tlRecord={tlRecord}
            currentTrackerItem={currentTrackerItem}
          />
        </DialogContent>
        <DialogActions>{}</DialogActions>
      </Dialog>
    </Fragment>
  );
};

BillTrackerTimelineQuickCreateButton.propTypes = {
  currentTrackerItem: PropTypes.object,
  tlRecord: PropTypes.object
};

export default BillTrackerTimelineQuickCreateButton;
