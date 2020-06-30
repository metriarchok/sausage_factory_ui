import React from 'react';
import { useTranslate, ValidationError } from 'ra-core';
import PropTypes from 'prop-types';

const InputHelperText = ({ helperText, touched, error }) => {
  const translate = useTranslate();
  if (touched && error) {
    return <ValidationError error={error} />;
  }
  if (helperText) {
    return <div>{translate(helperText, { _: helperText })}</div>;
  }
  return null;
};
InputHelperText.propTypes = {
  helperText: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool
};
export default InputHelperText;
