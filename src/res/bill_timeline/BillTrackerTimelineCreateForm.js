import React from 'react';

import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import {
  Button,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Grid,
  Typography,
  InputLabel,
  FormHelperText,
  withStyles
} from '@material-ui/core';
import { TextField } from 'final-form-material-ui';
import { LoadingIndicator, Error, useQueryWithStore } from 'react-admin';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import BillTimelineCard from './BillTimelineCard';

const styles = theme => ({
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
    }
  }
});

const SelectWithLookup = props => {
  const { resource, pagination, sort, filter, optValue, optText, onChange, name, value, label, helperText } = props;
  const { data, loading, error } = useQueryWithStore({
    type: 'getList',
    resource: resource,
    payload: {
      pagination: pagination || { page: 1, perPage: 100 },
      sort: sort || { field: 'id', order: 'DESC' },
      filter: filter || {}
    }
  });
  if (loading) return <LoadingIndicator />;
  if (error) return <Error />;
  if (!data) return null;
  return (
    <FormControl fullWidth>
      {label ? (
        <InputLabel style={{ color: '#FFF' }} id={`${name}-label`}>
          {label}
        </InputLabel>
      ) : null}
      <Select labelId={`${name}-label`} fullWidth name={name} value={value} onChange={onChange}>
        {data.map(d => {
          return <MenuItem value={d[optValue]}>{d[optText]}</MenuItem>;
        })}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};
SelectWithLookup.propTypes = {
  resource: PropTypes.string,
  pagination: PropTypes.object,
  sort: PropTypes.object,
  filter: PropTypes.object,
  optValue: PropTypes.string,
  optText: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  helperText: PropTypes.string
};

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);
Condition.propTypes = {
  when: PropTypes.string,
  is: PropTypes.string,
  children: PropTypes.element
};

const DisplayReference = ({ source, display, resource, record = {} }) => {
  const id = record[source];
  console.log('disp ref');
  console.log(id);
  const { data, loading, error } = useQueryWithStore({
    type: 'getOne',
    resource: resource,
    payload: { id: id }
  });
  if (loading) return <LoadingIndicator />;
  if (error) return <Error />;
  if (!data) return null;
  return <Typography variant="body1">{data[display]}</Typography>;
};
DisplayReference.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  display: PropTypes.string,
  resource: PropTypes.string
};

class BillTrackerTimelineCreateForm extends React.Component {
  render() {
    const { basePath, record, tlRecord, currentTrackerItem, save, saving, version, classes, onSubmit } = this.props;
    console.log(basePath, record, save, saving, version);
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
    let submit;
    return (
      <div>
        <button
          type="submit"
          onClick={event => {
            console.log(event);

            submit(event);
          }}
          style={{ marginTop: 10 }}>
          Create
        </button>
        <Form
          initialValues={record}
          onSubmit={onSubmit}
          mutators={{ ...arrayMutators }} // necessary for ArrayInput
          subscription={defaultSubscription} // don't redraw entire form each time one field changes
          key={version} // support for refresh button
          keepDirtyOnReinitialize
          render={({ handleSubmit, form, submitting, pristine, values }) => {
            submit = handleSubmit;
            return (
              <div className={classes.gridWrapper}>
                <form id="bill_tracker_timeline_qc_form" onSubmit={submit}>
                  <Grid container spacing={3}>
                    <Grid container xs={12} spacing={2}>
                      <Grid item xs={6}>
                        <Grid container>
                          <BillTimelineCard tlRecord={tlRecord} />
                          <Field defaultValue="Move" name="action" component="radio">
                            {props => (
                              <div>
                                <FormControl className={classes.actionField} defaultValue="Move" component="fieldset">
                                  <RadioGroup
                                    name={props.input.name}
                                    value={props.input.value}
                                    onChange={props.input.onChange}
                                    defaultValue="Move"
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
                      <Grid container spacing={3} xs={6}>
                        <Button>Add Reference</Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <Field
                        defaultValue={tlRecord.title}
                        label="Title"
                        name="title"
                        component={TextField}
                        type="text"
                        style={{ marginLeft: '-20px' }}
                        fullWidth
                      />
                    </Grid>

                    <Grid className={classes.currentStepGrid} container spacing={2}>
                      <Grid style={{ marginLeft: '12px' }} item xs={3}>
                        <FormLabel component="legend">Current Body</FormLabel>
                        <DisplayReference
                          record={currentTrackerItem}
                          source="body_id"
                          resource="bodies"
                          display="body_name"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <FormLabel component="legend">Current Step</FormLabel>
                        <DisplayReference
                          record={currentTrackerItem}
                          source="tracker_step_id"
                          resource="tracker_steps"
                          display="display_name"
                        />
                      </Grid>
                      {currentTrackerItem.committee_id !== 0 ? (
                        <Grid item xs={4}>
                          <FormLabel component="legend">Current Committee</FormLabel>
                          <DisplayReference
                            record={currentTrackerItem}
                            source="committee_id"
                            resource="committees"
                            display="committee_name"
                          />
                        </Grid>
                      ) : null}
                    </Grid>

                    <Condition when="action" is="Move">
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
                    </Condition>

                    <Condition when="action" is="Edit">
                      <Field name="edit_action" component="select">
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
                          component={TextField}
                          fullWidth
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={11}>
                      <Field label="Summary Text" name="summary_text" type="textarea" component={TextField} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <button type="submit" disabled={submitting || pristine}>
                        Submit
                      </button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

BillTrackerTimelineCreateForm.propTypes = {
  basePath: PropTypes.string,
  record: PropTypes.object,
  save: PropTypes.func,
  saving: PropTypes.bool,
  version: PropTypes.string,
  currentTrackerItem: PropTypes.object,
  tlRecord: PropTypes.object,
  classes: PropTypes.object,
  onSubmit: PropTypes.func
};

const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  invalid: true
};

export default withStyles(styles)(BillTrackerTimelineCreateForm);
