import React from 'react';
import { Create, DateInput, TextInput, SimpleForm, required } from 'react-admin';
import { parse } from 'query-string';
import BillReferenceInput from './BillReferenceInput';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
const today = new Date();

const CommentCreate = props => {
  // Read the post_id from the location which is injected by React Router and passed to our component by react-admin automatically
  console.log('Comment create');
  console.log(parse(props.location.search));
  const { bill_id: bill_id_string } = parse(props.location.search);

  // ra-data-fakerest uses integers as identifiers, we need to parse the querystring
  // We also must ensure we can still create a new comment without having a post_id
  // from the url by returning an empty string if post_id isn't specified
  const bill_id = bill_id_string ? parseInt(bill_id_string, 10) : '';

  const redirect = bill_id ? `/bills/${bill_id}/show/comments` : false;

  return (
    <Create {...props}>
      <SimpleForm defaultValue={{ created_at: today, bill_id }} redirect={redirect}>
        <BillReferenceInput source="bill_id" reference="bills" allowEmpty validate={required()} perPage={10000} />
        <DateInput source="created_at" />
        <TextInput source="body" />
      </SimpleForm>
    </Create>
  );
};

CommentCreate.propTypes = {
  location: { search: PropTypes.string }
};

export default reduxForm({
  form: 'Create Comment'
})(CommentCreate);
