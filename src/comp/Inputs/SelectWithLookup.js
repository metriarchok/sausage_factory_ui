import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

import { LoadingIndicator, Error, useQueryWithStore } from 'react-admin';

const SelectWithLookup = props => {
  const {
    resource,
    pagination,
    sort,
    filter,
    optValue,
    optText,
    onChange,
    name,
    value,
    label,
    helperText,
    defaultValue
  } = props;
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
      {defaultValue ? (
        <Select
          defaultValue={defaultValue}
          labelId={`${name}-label`}
          fullWidth
          name={name}
          value={value}
          onChange={onChange}
        >
          {data.map(d => {
            return <MenuItem value={d[optValue]}>{d[optText]}</MenuItem>;
          })}
        </Select>
      ) : (
        <Select labelId={`${name}-label`} fullWidth name={name} value={value} onChange={onChange}>
          {data.map(d => {
            return <MenuItem value={d[optValue]}>{d[optText]}</MenuItem>;
          })}
        </Select>
      )}

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
  helperText: PropTypes.string,
  defaultValue: PropTypes.any
};

export default SelectWithLookup;
