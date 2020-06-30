import React from 'react';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';

const FabField = ({ source, record = {}, content, label }) => (
  <div className="ra-field" style={{ marginRight: '24px' }}>
    <div className="MuiFormControl-root MuiFormControl-marginDense">
      <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense">
        <span>{label}</span>
      </label>
      <div style={{ paddingTop: '18px' }}>
        <Fab size="small" color="primary" ariaLabel={label} href={record[source]}>
          {content}
        </Fab>
      </div>
    </div>
  </div>
);

FabField.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  content: PropTypes.object,
  label: PropTypes.string
};

export default FabField;
