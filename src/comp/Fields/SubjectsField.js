import React, { useEffect, useState } from 'react';
import { LoadingIndicator } from 'react-admin';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';

const SubjectsField = ({ record }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (record && record.subjects) {
      setSubjects(record.subjects);
    }
    console.log('subjects', record.subjects);
    setLoading(false);
  }, []);
  if (loading) return <LoadingIndicator />;
  if (!subjects) return null;
  return <div>{subjects.map(i => i && <Chip key={`subject_${i.id}`} label={i.subject_name} />)}</div>;
};
SubjectsField.propTypes = {
  record: PropTypes.object
};

export default SubjectsField;
