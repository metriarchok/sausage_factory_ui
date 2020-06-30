import React, { useCallback } from 'react';
import { Edit, SaveButton, sanitizeEmptyValues, useUpdate, useRedirect, useNotify } from 'react-admin';
import { Form, Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { Grid, FormLabel, IconButton, Typography, Select, MenuItem, FormControl } from '@material-ui/core';
import RichTextInput from 'ra-input-rich-text';
import { TextField } from 'final-form-material-ui';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const SubmitUpdateButton = ({ basePath, redirect, formProps }) => {
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
        resource: 'bills',
        payload: {
          id: formValues.id,
          data: {
            ...formValues
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
SubmitUpdateButton.propTypes = {
  basePath: PropTypes.string,
  redirect: PropTypes.string,
  formProps: PropTypes.object
};

const BillEditForm = ({ basePath, record, version, redirect }) => {
  const submit = values => {
    // React-final-form removes empty values from the form state.
    // To allow users to *delete* values, this must be taken into account
    sanitizeEmptyValues(record, values);
  };
  return (
    <Form
      initialValues={record}
      onSubmit={submit}
      mutators={{ ...arrayMutators }} // necessary for ArrayInput
      subscription={defaultSubscription} // don't redraw entire form each time one field changes
      key={version} // support for refresh button
      keepDirtyOnReinitialize
      render={formProps => (
        <Grid style={{ padding: '36px' }} container fullWidth spacing={3} alignItems="center" justify="flex-center">
          <Grid item xs={8}>
            <Typography variant="body2" component="span">
              Subjects
            </Typography>
            <FieldArray defaultValue={record.subjects} name="subjects">
              {({ fields }) => {
                return (
                  <div style={{ width: '100%' }}>
                    {fields.map((name, index) => (
                      <div style={{ width: '100%' }} key={name}>
                        <Grid container spacing={3} xs={12}>
                          <Grid item xs={8}>
                            <Field name={`${name}.subject_name`} type="text" component={TextField} fullWidth />
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
                );
              }}
            </FieldArray>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" component="span">
              Category
            </Typography>
            <Field fullWidth name="categord" component="select">
              {props => (
                <div>
                  <FormControl fullWidth>
                    <Select
                      fullWidth
                      name={props.input.name}
                      value={props.input.value}
                      onChange={props.input.onChange}
                      row>
                      <MenuItem value="Health">Health</MenuItem>
                      <MenuItem value="Maternal and Child Health">Maternal and Child Health</MenuItem>
                      <MenuItem value="Adolescent Health">Adolescent Health</MenuItem>
                      <MenuItem value="Mental Health">Mental Health</MenuItem>
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Economic">Economic</MenuItem>
                      <MenuItem value="Criminal Justice">Criminal Justice</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
            </Field>
          </Grid>
          <Grid item xs={3}>
            <FormLabel style={{ textAlign: 'center' }} component="legend">
              Summary Title for Bill
            </FormLabel>
          </Grid>
          <Grid item xs={8}>
            <Field label="Title" name="bill_summary_title" component={TextField} type="string" fullWidth />
          </Grid>
          <Grid xs={3} alignItems="center" justify="flex-center">
            <FormLabel style={{ textAlign: 'center' }} component="legend">
              Summary Text for Bill
            </FormLabel>
          </Grid>
          <Grid item xs={8}>
            <RichTextInput
              style={{ width: '100%' }}
              defaultValue={record.bill_summary}
              stripTags={false}
              label=""
              addLabel={false}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitUpdateButton {...basePath} {...redirect} {...formProps} />
          </Grid>
        </Grid>
      )}
    />
  );
};
BillEditForm.propTypes = {
  basePath: PropTypes.string,
  record: PropTypes.object,
  save: PropTypes.func,
  saving: PropTypes.bool,
  version: PropTypes.string,
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

const BillEdit = props => {
  return (
    <Edit {...props} actions={null}>
      <BillEditForm {...props} />
    </Edit>
  );
};

export default BillEdit;
