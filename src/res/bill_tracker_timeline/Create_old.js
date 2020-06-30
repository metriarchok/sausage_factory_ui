import React, { useState, Fragment } from 'react';
import {
  Create,
  TextInput,
  NumberInput,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  RadioButtonGroupInput,
  required,
  TextField,
  NumberField,
  DateField
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { reduxForm } from 'redux-form';
import { parse } from 'query-string';
import PropTypes from 'prop-types';
import { Box, Card, CardHeader, Divider, Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './create.css';

import TimelineItemAvatar from '../bill_timeline/TimelineItemAvatar';

const today = new Date();
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

const CommitteeField = ({ ...props }) => {
  return props.in_committee ? (
    <Fragment>
      <SelectInput optionText="committee_id" />
    </Fragment>
  ) : null;
};
CommitteeField.propTypes = {
  in_committee: PropTypes.boolean
};

const CurrentCommitteeField = ({ ...props }) => {
  const inCommittee = props.previous_committee_id !== 0;
  return inCommittee ? (
    <Fragment>
      <SelectInput optionText="previous_committee_id" />
    </Fragment>
  ) : null;
};
CurrentCommitteeField.propTypes = {
  previous_committee_id: PropTypes.number
};

const CurrentBodyField = ({ ...props }) => {
  const { choices, defaultValue } = props;
  return (
    <Fragment>
      <SelectInput
        style={{ width: '180px' }}
        source="previous_body_id"
        optionsValue="body_id"
        optionText="body_name"
        choices={choices}
        variant="outlined"
        disabled
        defaultValue={defaultValue}
      />
    </Fragment>
  );
};
CurrentBodyField.propTypes = {
  choices: PropTypes.array,
  defaultValue: PropTypes.string
};

const CurrentStepField = ({ ...props }) => {
  const { choices, defaultValue } = props;
  return (
    <Fragment>
      <SelectInput
        style={{ maxWidth: '360px', minWidth: '200px', width: '100%', marginLeft: '30px' }}
        source="previous_tracker_step_id"
        optionsValue="id"
        optionText="display_name"
        choices={choices}
        variant="outlined"
        disabled
        defaultValue={defaultValue}
      />
    </Fragment>
  );
};
CurrentStepField.propTypes = {
  choices: PropTypes.array,
  defaultValue: PropTypes.string
};

const MoveToBody = ({ ...props }) => {
  const { selected_action, choices } = props;
  return selected_action === 'Move' ? (
    <Fragment>
      <SelectInput
        style={{ width: '180px' }}
        source="body_id"
        choices={choices}
        optionsValue="body_id"
        optionText="body_name"
      />
    </Fragment>
  ) : null;
};
MoveToBody.propTypes = {
  selected_action: PropTypes.string,
  choices: PropTypes.array
};

const BillTrackerTimelineCreate = props => {
  // Form location: /bills/show/:id
  // Trigger component: /bills/AddTrackerTimelineButton
  // Page location: /bill_tracker_timeline/create?{urlParams}

  // Read the param values from the url sent to the form from the /{parent}/path
  const searchProps = props.location ? parse(props.location.search) : props.tlRecord;
  const currentTrackerStep = props.currentTrackerItem;
  const prevOrder = parseInt(currentTrackerStep.order);
  console.log(prevOrder);

  const bill_id = searchProps.bill_id ? parseInt(searchProps.bill_id, 10) : '';
  const action = searchProps.action ? searchProps.action : 'Move';
  const previous_tracker_step_id = currentTrackerStep.tracker_step_id;
  const previous_body_id = currentTrackerStep.body_id;
  const previous_committee_id = currentTrackerStep.committee_id;
  const order = prevOrder + 1;
  console.log(order);
  const date = searchProps.date;
  const time = searchProps.time;
  const trigger_timeline_id = props.tlRecord.id;
  const classes = useStyles();
  const [showCommitteeSelect, setShowCommitteeSelect] = useState(false);
  const [selectedAction, setSelectedAction] = useState(action);
  const [selectedNextTrackerStep, setSelectedNextTrackerStep] = useState();
  console.log(selectedNextTrackerStep);

  const committeeSteps = [
    'house_committee_report_and_vote',
    'house_committee_vote',
    'in_house_committee',
    'in_senate_committee',
    'referred_to_house_committee',
    'referred_to_senate_committee',
    'senate_committee_report_and_vote',
    'senate_committee_vote'
  ];
  const tlRecord = props.tlRecord;
  return (
    <Create basePath="/bill_tracker_timeline" resource="bill_tracker_timeline" {...props}>
      <SimpleForm
        defaultValue={{
          created_at: today,
          bill_id,
          trigger_timeline_id,
          action,
          previous_tracker_step_id,
          tracker_step_id: previous_tracker_step_id,
          previous_body_id,
          body_id: previous_body_id,
          previous_committee_id,
          committee_id: previous_committee_id,
          order,
          date,
          time
        }}
        basePath="/bill_tracker_timeline"
        resource="bill_tracker_timeline"
      >
        <Box style={{ width: '100%' }} p="1em">
          <Box display="flex">
            <Box flex={1}>
              <Box className={classes.flexRow} display="flex">
                <Card key={tlRecord.id} className={classes.card}>
                  <CardHeader
                    title={<TextField record={tlRecord} source="title" />}
                    subheader={
                      <Grid container alignItems="center" className={classes.subhead}>
                        <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                          Order:&nbsp;
                          <NumberField record={tlRecord} source="eventIndex" />
                        </Typography>
                        <Divider orientation="vertical" />
                        <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                          Date:&nbsp;
                          <DateField record={tlRecord} source="date" />
                        </Typography>
                        <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                          Type:&nbsp;
                          <TextField record={tlRecord} source="eventType" />
                        </Typography>
                      </Grid>
                    }
                    avatar={<TimelineItemAvatar eventType={tlRecord.eventType} />}
                  />
                </Card>
              </Box>

              <Box className={classes.flexRow} display="flex">
                <RadioButtonGroupInput
                  onChange={action => {
                    setSelectedAction(action);
                  }}
                  source="action"
                  choices={[
                    { id: 'Move', name: 'Move' },
                    { id: 'Edit', name: 'Edit' },
                    { id: 'Callout', name: 'Callout' }
                  ]}
                />
                <NumberInput source="order" hidden />
              </Box>

              <Box display="flex" style={{ alignItems: 'center', minHeight: '60px' }}>
                <ReferenceInput
                  className={classes.flexInput}
                  source="previous_body_id"
                  reference="bodies"
                  filter={{ state_id: 36 }}
                  allowEmpty
                  perPage={10}
                >
                  <CurrentBodyField {...props} />
                </ReferenceInput>
                <ReferenceInput
                  className={classes.flexInput}
                  source="previous_tracker_step_id"
                  reference="tracker_steps"
                  allowEmpty
                  perPage={1}
                >
                  <CurrentStepField style={{ width: '130px' }} tracker_step_id={previous_tracker_step_id} {...props} />
                </ReferenceInput>
                <ReferenceInput
                  className={classes.flexInput}
                  source="previous_committee_id"
                  reference="committees"
                  allowEmpty
                  perPage={1}
                >
                  <CurrentCommitteeField previous_committee_id={previous_committee_id} {...props} />
                </ReferenceInput>
              </Box>

              {selectedAction === 'Move' ? (
                <div>
                  <Box display="flex" style={{ alignItems: 'center', minHeight: '60px', marginLeft: '205px' }}>
                    <KeyboardArrowDownIcon />{' '}
                  </Box>
                  <Box display="flex" style={{ alignItems: 'center', minHeight: '60px' }}>
                    <ReferenceInput
                      className={classes.flexInput}
                      source="body_id"
                      reference="bodies"
                      filter={{ state_id: 36 }}
                      allowEmpty
                      validate={required()}
                      perPage={10}
                    >
                      <MoveToBody style={{ width: '100%' }} selected_action={selectedAction} {...props} />
                    </ReferenceInput>
                    <ReferenceInput
                      className={classes.flexInput}
                      source="tracker_step_id"
                      reference="tracker_steps"
                      allowEmpty
                      perPage={50}
                    >
                      <SelectInput
                        style={{ maxWidth: '360px', minWidth: '200px', width: '100%', marginLeft: '30px' }}
                        source="tracker_step_id"
                        optionsValue="id"
                        optionText="display_name"
                        onClick={event => {
                          const v = event.target.value;
                          setSelectedNextTrackerStep(v);
                          const s = committeeSteps.includes(v);
                          setShowCommitteeSelect(s);
                        }}
                      />
                    </ReferenceInput>
                    <Box display="flex">
                      <ReferenceInput
                        className={classes.flexInput}
                        source="committee_id"
                        reference="committees"
                        filter={{ committee_body_id: 79 }}
                        allowEmpty
                        perPage={50}
                      >
                        <CommitteeField in_committee={showCommitteeSelect} {...props} />
                      </ReferenceInput>
                    </Box>
                  </Box>
                </div>
              ) : null}

              <Box className={classes.flexRow} style={{ marginTop: '30px' }} display="flex">
                <Box style={{ width: '130px' }}>
                  <p>Callout Text</p>
                </Box>
                <Box style={{ width: '100%' }} ml="1em">
                  <TextInput
                    style={{ maxWidth: '500px', minWidth: '350px' }}
                    resettable="true"
                    multiline
                    fullWidth
                    source="callout_message"
                  />
                  <NumberInput style={{ width: '130px', marginLeft: '30px' }} source="duration" />
                </Box>
              </Box>
              <Box className={classes.flexRow} display="flex">
                <Box style={{ width: '130px' }} flex={(0, 1, 'auto')} mr="1em">
                  <p>Summary Text</p>
                </Box>
                <Box style={{ width: '100%' }} flex={(1, 1, 'auto')} ml="1em" mr="2em">
                  <RichTextInput
                    style={{ maxWidth: '650px', minWidth: '400px' }}
                    source="summary_text"
                    stripTags={false}
                    label=""
                    addLabel={false}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};
BillTrackerTimelineCreate.propTypes = {
  location: { search: PropTypes.string },
  tlRecord: PropTypes.object,
  currentTrackerItem: PropTypes.object
};

export default reduxForm({
  form: 'bill_tracker_step_qc'
})(BillTrackerTimelineCreate);
