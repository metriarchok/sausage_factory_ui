import React from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

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

export default Condition;
