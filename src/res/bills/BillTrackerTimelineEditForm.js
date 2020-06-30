import React, { useCallback } from 'react';

import { SaveButton, useUpdate, useRedirect, useNotify, sanitizeEmptyValues } from 'react-admin';
import { Form, Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import {
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Grid,
  InputLabel,
  makeStyles,
  IconButton,
  Typography
} from '@material-ui/core';
import RichTextInput from 'ra-input-rich-text';
import { TextField, Checkbox } from 'final-form-material-ui';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import Condition from '../../comp/Fields/Condition';
import DisplayReference from '../../comp/Fields/DisplayReference';
import SelectTimelineEvent from '../../comp/Inputs/SelectTimelineEvent';
import SelectWithLookup from '../../comp/Inputs/SelectWithLookup';
import BillTimelineCard from '../bill_timeline/BillTimelineCard';

const useStyles = makeStyles(theme => ({
  gridWrapper: {
    paddingLeft: '30px',
    paddingRight: '30px'
  },
  actionField: {
    marginTop: '-12px',
    marginLeft: '24px'
  },
  moveBoxGrid: {
    borderRadius: '12px',
    backgroundColor: theme.palette.primary.main,
    padding: '12px',
    '& p': {
      color: '#FFF'
    },
    '& svg': {
      color: '#FFF'
    },
    '& div.MuiSelect-selectMenu': {
      color: '#FFF'
    },
    '& div.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderColor: '#FFF'
    },
    '& div.MuiInput-underline:before': {
      borderColor: '#FFF',
      transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: '0ms'
    }
  },
  moveBoxArrow: {
    marginTop: '-10px',
    marginLeft: '-20px'
  },
  currentStepGrid: {
    borderRadius: '12px',
    marginBottom: '24px',
    marginTop: '6px',
    padding: '12px',
    backgroundColor: theme.palette.primary.main,
    '& p': {
      color: '#FFF'
    },
    '& legend.MuiFormLabel-root': {
      color: '#FFF'
    },
    orderDateContainer: {
      paddingTop: '32px'
    },
    refArrayContainer: {
      marginTop: '30px',
      backgroundColor: theme.palette.secondary.light,
      borderRadius: '10px'
    }
  }
}));

const SubmitCreateButton = ({ basePath, redirect, formProps, tlRecord }) => {
  const [update] = useUpdate();
  const redirectTo = useRedirect();
  const notify = useNotify();

  const formState = useFormState();
  const formValues = { ...formState.values };
  const handleClick = useCallback(() => {
    if (!formState.valid) {
      return;
    }
    update(
      {
        resource: 'bill_tracker_timeline',
        payload: {
          id: formValues.id,
          data: {
            action: formValues.action,
            edit_action: formValues.edit_action || '',
            bill_id: formValues.bill_id,
            body_id: formValues.body_id,
            callout_message: formValues.callout_message || '',
            committee_id: formValues.committee_id || 0,
            date: formValues.date,
            duration: formValues.duration || 300,
            order: formValues.order,
            ref_timeline_ids: formValues.ref_timeline_ids || [],
            sentiment: formValues.sentiment || 0,
            summary_text: formValues.summary_text || '',
            time: formValues.time || 1200,
            title: formValues.title,
            tracker_path_id: formValues.tracker_path_id || '',
            tracker_step_id: formValues.tracker_step_id,
            trigger_timeline_id: formValues.trigger_timeline_id,
            show_in_timeline: formValues.show_in_timeline
          }
        }
      },
      {
        onSuccess: ({ data: newRecord }) => {
          notify('ra.notification.updated', 'info', {
            smart_count: 1
          });
          redirectTo(redirect, basePath, newRecord.id, newRecord);
        }
      }
    );
  }, [formState.valid, formState.values, update, notify, redirectTo, redirect, basePath]);

  return <SaveButton {...formProps} handleSubmitWithRedirect={handleClick} />;
};
SubmitCreateButton.propTypes = {
  basePath: PropTypes.string,
  redirect: PropTypes.string,
  idField: PropTypes.string,
  formProps: PropTypes.object,
  tlRecord: PropTypes.object
};

const BillTrackerTimelineCreateForm = ({ basePath, record, version, redirect, tlRecord }) => {
  const classes = useStyles();
  const submit = values => {
    // React-final-form removes empty values from the form state.
    // To allow users to *delete* values, this must be taken into account
    sanitizeEmptyValues(record, values);
  };
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
  return (
    <Form
      initialValues={tlRecord}
      onSubmit={submit}
      mutators={{ ...arrayMutators }} // necessary for ArrayInput
      subscription={defaultSubscription} // don't redraw entire form each time one field changes
      key={version} // support for refresh button
      keepDirtyOnReinitialize
      render={formProps => (
        <Grid container spacing={3}>
          <Grid container xs={12} spacing={2}>
            <Grid item hidden xs={12}>
              <Field
                defaultValue={tlRecord.order}
                label="Order"
                name="order"
                component={TextField}
                type="number"
                fullWidth
              />
              <Field
                defaultValue={tlRecord.bill_id}
                label="Bill Id"
                name="bill_id"
                component={TextField}
                type="string"
                fullWidth
              />
              <Field
                defaultValue={tlRecord.trigger_timeline_id}
                label="Bill Timeline Id"
                name="trigger_timeline_id"
                component={TextField}
                type="text"
                fullWidth
              />
              <Field
                defaultValue={tlRecord.date}
                label="Date"
                name="date"
                component={TextField}
                type="date"
                fullWidth
              />
              <Field
                defaultValue={tlRecord.tracker_path_id}
                label="Tracker Path ID"
                name="tracker_path_id"
                component={TextField}
                type="text"
                fullWidth
              />
              <Field defaultValue={tlRecord.id} label="ID" name="id" component={TextField} type="text" fullWidth />
              {tlRecord.order === 0 ? (
                <div>
                  <Field
                    defaultValue={tlRecord.body_id}
                    label="body_id"
                    name="body_id"
                    component={TextField}
                    type="number"
                    fullWidth
                  />
                  <Field
                    defaultValue={tlRecord.tracker_step_id}
                    label="tracker_step_id"
                    name="tracker_step_id"
                    component={TextField}
                    type="text"
                    fullWidth
                  />
                </div>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <BillTimelineCard tlRecord={tlRecord} />
                <Field disabled defaultValue={tlRecord.action} name="action" component="radio">
                  {props => (
                    <div>
                      <FormControl className={classes.actionField} defaultValue={tlRecord.action} component="fieldset">
                        <RadioGroup
                          defaultValue={tlRecord.action}
                          name={props.input.name}
                          value={props.input.value}
                          onChange={props.input.onChange}
                          row>
                          <FormControlLabel value="Move" control={<Radio />} label="Move" />
                          <FormControlLabel value="Edit" control={<Radio />} label="Edit" />
                          <FormControlLabel value="Callout" control={<Radio />} label="Callout" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                </Field>
              </Grid>
            </Grid>
            <Grid style={{ paddingTop: '20px', paddingLeft: '10px' }} container spacing={3} xs={6}>
              <Grid style={{ padding: '0' }} item xs={12}>
                <Typography style={{ fontSize: 'medium' }} variant="h4">
                  Reference Events
                </Typography>
              </Grid>
              <FieldArray defaultValue={tlRecord.ref_timeline_ids} name="ref_timeline_ids">
                {({ fields }) => (
                  <div style={{ width: '100%' }}>
                    {fields.map((name, index) => (
                      <div style={{ width: '100%' }} key={name}>
                        <Grid className={classes.refArrayContainer} container spacing={3} xs={12}>
                          <Grid item xs={8}>
                            <Field name={`${name}`} defaultValue={tlRecord.ref_timeline_ids[index]} component="select">
                              {props => (
                                <SelectTimelineEvent
                                  onChange={props.input.onChange}
                                  name={props.input.name}
                                  value={props.input.value}
                                  resource="bill_timeline"
                                  optValue="id"
                                  optText="title"
                                  filter={{ bill_id: tlRecord.bill_id }}
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid style={{ padding: '0' }} item xs={3}>
                            <IconButton onClick={() => fields.remove(index)}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                    <Grid item xs={12}>
                      <IconButton label="Add" onClick={() => fields.push('')}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                  </div>
                )}
              </FieldArray>
            </Grid>
          </Grid>
          <Grid item xs={11}>
            <Field
              defaultValue={tlRecord.title}
              label="Title"
              name="title"
              component={TextField}
              type="text"
              fullWidth
            />
          </Grid>
          {tlRecord.order > 0 ? (
            <Grid className={classes.currentStepGrid} container spacing={2}>
              <Grid style={{ marginLeft: '12px' }} item xs={3}>
                <FormLabel component="legend">Current Body</FormLabel>
                <DisplayReference record={tlRecord} source="prev_body_id" resource="bodies" display="body_name" />
              </Grid>
              <Grid item xs={5}>
                <FormLabel component="legend">Current Step</FormLabel>
                <DisplayReference
                  record={tlRecord}
                  source="prev_tracker_step_id"
                  resource="tracker_steps"
                  display="display_name"
                />
              </Grid>
              {tlRecord.prev_committee_id !== 0 ? (
                <Grid item xs={4}>
                  <FormLabel component="legend">Current Committee</FormLabel>
                  <DisplayReference
                    record={tlRecord}
                    source="prev_committee_id"
                    resource="committees"
                    display="committee_name"
                  />
                </Grid>
              ) : null}
            </Grid>
          ) : null}

          <Condition when="action" is="Move">
            {tlRecord.order > 0 ? (
              <Grid className={classes.moveBoxGrid} style={{ marginLeft: '12px' }} container spacing={2}>
                <Grid container xs={2} spacing={3}>
                  <Grid alignItems="center" justify="flex-start" item xs={1}>
                    <PlayArrowIcon className={classes.moveBoxArrow} />
                  </Grid>
                  <Grid item xs={9}>
                    <Field name="body_id" component="select" fullWidth>
                      {props => (
                        <SelectWithLookup
                          onChange={props.input.onChange}
                          name={props.input.name}
                          value={props.input.value}
                          resource="bodies"
                          optValue="body_id"
                          optText="body_short"
                          helperText="Body"
                          filter={{ state_id: 36 }}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
                <Field name="body_id" subscription={{ value: true }}>
                  {({ input: { value } }) => {
                    const bodyId = value;
                    return value ? (
                      <Grid container spacing={2} xs={10}>
                        <Grid item xs={5}>
                          <Field name="tracker_step_id" component="select" fullWidth>
                            {props => (
                              <SelectWithLookup
                                onChange={props.input.onChange}
                                name={props.input.name}
                                value={props.input.value}
                                filter={{ body_id: bodyId.toString() }}
                                resource="tracker_steps"
                                optValue="id"
                                optText="display_name"
                                helperText="Move to Step"
                              />
                            )}
                          </Field>
                        </Grid>

                        <Field name="tracker_step_id" subscription={{ value: true }}>
                          {({ input: { value } }) =>
                            committeeSteps.includes(value) ? (
                              <Grid item xs={7}>
                                <Field name="committee_id" component="select" fullWidth>
                                  {props => (
                                    <SelectWithLookup
                                      onChange={props.input.onChange}
                                      name={props.input.name}
                                      value={props.input.value}
                                      filter={{ committee_body_id: bodyId }}
                                      resource="committees"
                                      optValue="committee_id"
                                      optText="committee_name"
                                      helperText="In Committee"
                                    />
                                  )}
                                </Field>
                              </Grid>
                            ) : (
                              <Grid item xs={4} />
                            )
                          }
                        </Field>
                      </Grid>
                    ) : null;
                  }}
                </Field>
              </Grid>
            ) : null}
          </Condition>

          <Condition when="action" is="Edit">
            <Field defaultValue={tlRecord.edit_action} name="edit_action" component="select">
              {props => (
                <Grid container xs={11}>
                  <Grid style={{ textAlign: 'center', paddingTop: '10px' }} item xs={1}>
                    <EditIcon />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="edit-action-label">Edit Action</InputLabel>
                      <Select
                        fullWidth
                        name={props.input.name}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        labelId="edit-action-label">
                        <MenuItem value="">{}</MenuItem>
                        <MenuItem value="Ammended">Ammended</MenuItem>
                        <MenuItem value="Authored">Authored</MenuItem>
                        <MenuItem value="Removed as Author">Removed as Author</MenuItem>
                        <MenuItem value="Title Stricken">Title Stricken</MenuItem>
                        <MenuItem value="Title Reinacted">Title Reinacted</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Field>
          </Condition>

          <Grid container style={{ marginTop: '12px' }} xs={11}>
            <Grid style={{ textAlign: 'center', paddingTop: '10px' }} item xs={1}>
              <AnnouncementIcon />
            </Grid>
            <Grid item xs={9}>
              <Field
                label="Callout Message"
                name="callout_message"
                type="text"
                defaultValue={tlRecord.callout_message}
                component={TextField}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid item xs={11}>
            <RichTextInput
              defaultValue={tlRecord.summary_text}
              style={{ width: '100%' }}
              source="summary_text"
              stripTags={false}
              label=""
              addLabel={false}
            />
          </Grid>
          <Grid container>
            <Grid item xs={3}>
              <SubmitCreateButton {...basePath} {...redirect} {...formProps} {...tlRecord} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" size="small">
                Show in Timeline
              </Typography>
              <Field label="Show in Timeline" name="show_in_timeline" type="checkbox" component={Checkbox} fullWidth />
            </Grid>
          </Grid>
        </Grid>
      )}
    />
  );
};

BillTrackerTimelineCreateForm.propTypes = {
  basePath: PropTypes.string,
  record: PropTypes.object,
  save: PropTypes.func,
  saving: PropTypes.bool,
  version: PropTypes.string,
  tlRecord: PropTypes.object,
  classes: PropTypes.object,
  onSubmit: PropTypes.func,
  redirect: PropTypes.string,
  input: PropTypes.object
};

const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  invalid: true
};

export default BillTrackerTimelineCreateForm;
