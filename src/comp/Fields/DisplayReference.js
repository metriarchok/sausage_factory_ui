import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { LoadingIndicator, Error, useQueryWithStore } from 'react-admin';

const DisplayReference = ({ source, display, resource, record = {} }) => {
  const id = record[source];
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

export default DisplayReference;
