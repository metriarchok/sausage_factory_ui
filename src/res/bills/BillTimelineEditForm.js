import React, { useCallback } from 'react';
import {
  sanitizeEmptyValues,
  useUpdate,
  useRedirect,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  SaveButton,
  SelectInput,
  useNotify
} from 'react-admin';
import { Form, useFormState } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import RichTextInput from 'ra-input-rich-text';

import BillTrackerTimelineQuickCreateButton from './BillTrackerTimelineQuickCreateButton';

const SubmitEditButton = ({ basePath, redirect, formProps }) => {
  const [update] = useUpdate();
  const redirectTo = useRedirect();
  const notify = useNotify();

  const formState = useFormState();

  const handleClick = useCallback(() => {
    if (!formState.valid) {
      return;
    }
    update(
      {
        resource: 'bill_timeline',
        payload: {
          id: { ...formState.values['id'] },
          data: { ...formState.values }
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
SubmitEditButton.propTypes = {
  basePath: PropTypes.string,
  redirect: PropTypes.string,
  idField: PropTypes.string,
  formProps: PropTypes.object
};

// the parent component (Edit or Create) injects these props to their child
const BillTimelineEditForm = ({ basePath, record, version, redirect, currentTrackerItem }) => {
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
        <Box style={{ margin: '0!important', padding: '30px' }}>
          <Box display="flex">
            <Box flex={1}>
              <TextInput style={{ maxWidth: '115px', marginRight: '10px' }} source="time" label="Time" />
              <TextInput style={{ maxWidth: '115px', marginRight: '10px' }} margin="dense" source="chamber" />
              <BillTrackerTimelineQuickCreateButton tlRecord={record} currentTrackerItem={currentTrackerItem} />
            </Box>
          </Box>

          <Box display="flex" style={{ marginRight: '12px' }}>
            <RichTextInput
              style={{ width: '100%' }}
              toolbar={['link', 'bold', 'underline', 'italic']}
              source="description"
              stripTags={false}
              label=""
              addLabel={false}
            />
          </Box>
          <Box display="flex">
            <ArrayInput source="people">
              <SimpleFormIterator>
                <SelectInput options={{ label: 'Subject' }} source="subject" />
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
          <SubmitEditButton {...basePath} {...redirect} {...formProps} />
        </Box>

        // render your custom form here
      )}
    />
  );
};
BillTimelineEditForm.propTypes = {
  basePath: PropTypes.string,
  record: PropTypes.object,
  version: PropTypes.string,
  redirect: PropTypes.string,
  currentTrackerItem: PropTypes.object
};

const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  invalid: true
};

export default BillTimelineEditForm;
