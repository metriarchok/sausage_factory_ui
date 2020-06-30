import React from 'react';
import { Create, TextInput, NumberInput, FormWithRedirect, Toolbar, SaveButton, DeleteButton } from 'react-admin';

import { reduxForm } from 'redux-form';

import { Box } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  flexInput: {
    marginRight: '30px'
  },
  flexRow: {
    marginBottom: '30px'
  },
  card: {
    width: '40%',
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    borderLeft: '24px solid #ccc!important',
    borderColor: '#2196F3!important'
  },
  subhead: {
    width: 'fit-content'
  },
  subheadItem: {
    marginRight: '10px'
  },
  avatar: {
    backgroundColor: '#ff0000'
  }
});

const BillTrackerTimelineCreateForm = props => {
  const classes = useStyles();
  return (
    <FormWithRedirect
      {...props}
      render={formProps => {
        console.log('BillTrackerTimelineCreateForm');
        console.log(formProps);
        return (
          <form>
            <Box className={classes.flexRow} display="flex">
              <NumberInput source="order" resource="bill_tracker_timeline" />
              <TextInput source="bill_timeline_id" resource="bill_tracker_timeline" />
              <TextInput source="callout_message" resource="bill_tracker_timeline" />
              <TextInput source="title" resource="bill_tracker_timeline" />
            </Box>
            <Toolbar>
              <Box display="flex" justifyContent="space-between" width="100%">
                <SaveButton saving={formProps.saving} handleSubmitSithRedirect={formProps.handleSubmitSithRedirect} />
                <DeleteButton record={formProps.record} />
              </Box>
            </Toolbar>
          </form>
        );
      }}
    />
  );
};

const BillTrackerTimelineCreate = props => {
  return (
    <Create {...props}>
      <BillTrackerTimelineCreateForm />
    </Create>
  );
};

export default reduxForm({
  form: 'bill_tracker_step_qc'
})(BillTrackerTimelineCreate);
