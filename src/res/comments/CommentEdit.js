import React from 'react';
import { Edit, DateInput, TextInput, SimpleForm, required } from 'react-admin';
import { reduxForm } from 'redux-form';
import BillReferenceInput from './BillReferenceInput';

const CommentEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BillReferenceInput source="bill_id" reference="bills" allowEmpty validate={required()} perPage={10000} />
        <DateInput source="created_at" />
        <TextInput source="body" />
      </SimpleForm>
    </Edit>
  );
};

export default reduxForm({
  form: 'Edit Comment'
})(CommentEdit);
