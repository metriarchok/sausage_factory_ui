import React, { Fragment } from 'react';
import {
  Edit,
  TextInput,
  NumberInput,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextField,
  NumberField,
  DateField,
  RadioButtonGroupInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { reduxForm } from 'redux-form';
import { Box, Card, CardHeader, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TimelineItemAvatar from '../bill_timeline/TimelineItemAvatar';

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
  const inCommittee = props.record.current_committee_id !== 0;
  return inCommittee ? (
    <Fragment>
      <SelectInput optionText="committee_id" />
    </Fragment>
  ) : null;
};
CurrentCommitteeField.propTypes = {
  record: PropTypes.object
};

const CurrentBodyField = ({ ...props }) => {
  const { choices, defaultValue } = props;
  return (
    <Fragment>
      <SelectInput
        style={{ width: '180px' }}
        source="current_body_id"
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
        source="current_tracker_step"
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

const BillTrackerTimelineEdit = props => {
  console.log('BillTrackerTimelineEdit');
  const { record } = props;
  console.log(record);
  const classes = useStyles();
  return (
    <Edit basePath="/bill_tracker_timeline" resource="bill_tracker_timeline" {...props}>
      <SimpleForm {...props}>
        <Box style={{ width: '100%' }} p="1em">
          <Box display="flex">
            <Box flex={1}>
              <Box className={classes.flexRow} display="flex">
                <Card key={props.record.trigger_timeline_id} className={classes.card}>
                  <CardHeader
                    title={<TextField source="title" />}
                    subheader={
                      <Grid container alignItems="center" className={classes.subhead}>
                        <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                          Order:&nbsp;
                          <NumberField source="eventIndex" />
                        </Typography>
                        <Divider orientation="vertical" />
                        <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                          Date:&nbsp;
                          <DateField source="date" />
                        </Typography>
                        <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                          Type:&nbsp;
                          <TextField source="eventType" />
                        </Typography>
                      </Grid>
                    }
                    avatar={<TimelineItemAvatar eventType={record.eventType} />}
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
              </Box>

              <Box display="flex" style={{ alignItems: 'center', minHeight: '60px' }}>
                <ReferenceInput
                  className={classes.flexInput}
                  source="current_body_id"
                  reference="bodies"
                  filter={{ state_id: 36 }}
                  allowEmpty
                  perPage={10}
                >
                  <CurrentBodyField {...props} />
                </ReferenceInput>
                <ReferenceInput
                  className={classes.flexInput}
                  source="current_tracker_step"
                  reference="tracker_steps"
                  allowEmpty
                  perPage={1}
                >
                  <CurrentStepField style={{ width: '130px' }} {...props} />
                </ReferenceInput>
                <ReferenceInput
                  className={classes.flexInput}
                  source="current_committee_id"
                  reference="committees"
                  allowEmpty
                  perPage={1}
                >
                  <CurrentCommitteeField {...props} />
                </ReferenceInput>
              </Box>

              {record.action === 'Move' ? (
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
                      <MoveToBody style={{ width: '100%' }} selected_action={record.action} {...props} />
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
                          console.log(selectedNextTrackerStep);
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
                    source="callout_text"
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
    </Edit>
  );
};
BillTrackerTimelineEdit.propTypes = {
  record: PropTypes.object
};

export default reduxForm({
  form: 'edit_bill_timeline_item'
})(BillTrackerTimelineEdit);
