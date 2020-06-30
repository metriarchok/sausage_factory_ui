import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { FieldTitle, useInput } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';
import InputHelperText from './InputHelperText';

const BooleanFuncInput = ({
  format,
  label,
  fullWidth,
  helperText,
  onBlur,
  onChange,
  onFocus,
  options,
  parse,
  resource,
  source,
  validate,
  booleanFunc,
  ...rest
}) => {
  const {
    id,
    input: { onChange: finalFormOnChange, type, value, ...inputProps },
    isRequired,
    meta: { error, touched }
  } = useInput({
    format,
    onBlur,
    onChange,
    onFocus,
    parse,
    resource,
    source,
    type: 'checkbox',
    validate,
    ...rest
  });

  const handleChange = useCallback(
    (event, value) => {
      finalFormOnChange(booleanFunc(value));
    },
    [finalFormOnChange]
  );

  return (
    <FormGroup {...sanitizeRestProps(rest)}>
      <FormControlLabel
        control={<Switch id={id} color="primary" onChange={handleChange} {...inputProps} {...options} />}
        label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
      />
      {(touched && error) || helperText ? (
        <FormHelperText error={!!error}>
          <InputHelperText touched={touched} error={error} helperText={helperText} />
        </FormHelperText>
      ) : null}
    </FormGroup>
  );
};

BooleanFuncInput.propTypes = {
  format: PropTypes.object,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.object,
  parse: PropTypes.func,
  resource: PropTypes.object,
  source: PropTypes.string,
  validate: PropTypes.func,
  booleanFunc: PropTypes.func
};

BooleanFuncInput.defaultProps = {
  options: {}
};

export default BooleanFuncInput;
