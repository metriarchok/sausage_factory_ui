import React from 'react';
import { Edit, DateInput, TextInput, NumberInput, SimpleForm } from 'react-admin';
import { reduxForm } from 'redux-form';

const BillTimelineEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="bill_id" reference="bills">
        <SelectInput optionText="bill_number" />
      </ReferenceInput>
      <DateInput source="date" />
      <NumberInput source="eventIndex" />
      <TextInput source="eventType" />
      <TextInput source="title" />
      <TextInput source="chamber" />
      <TextInput source="description" />
      <TextInput source="time" />
      <TextInput source="timelineSteps" />
    </SimpleForm>
  </Edit>
);

export default reduxForm({
  form: 'Edit Bill Timeline Item'
})(BillTimelineEdit);
