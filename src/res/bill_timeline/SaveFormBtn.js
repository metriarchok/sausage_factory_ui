import React from 'react';
import { SaveButton, crudUpdate, crudCreate } from 'react-admin';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const saveHandler = (values, basePath, redirectTo, isEdit, handler, resource, crudCreate, crudUpdate) => {
  const modifiedValues = { ...values };

  handler(modifiedValues, isEdit).then(() => {
    if (isEdit) {
      return crudUpdate(resource, modifiedValues.id, modifiedValues, values, basePath, redirectTo);
    }
    return crudCreate(resource, modifiedValues, basePath, redirectTo);
  });
};

const SaveFormBtn = props => {
  const handleClick = () => {
    const { basePath, handleSubmit, redirect, resource, saveHandler, handler, isEdit, crudCreate, crudUpdate } = props;

    return handleSubmit(values => {
      return saveHandler(values, basePath, redirect, isEdit, handler, resource, crudCreate, crudUpdate);
    });
  };

  const {
    handleSubmitWithRedirect,
    handleSubmit,
    saveHandler,
    isEdit,
    handler,
    crudCreate,
    crudUpdate,
    ...rest
  } = props;

  return <SaveButton handleSubmitWithRedirect={handleClick} {...rest} />;
};

SaveFormBtn.propTypes = {
  basePath: PropTypes.string,
  handleSubmit: PropTypes.func,
  redirect: PropTypes.string,
  resource: PropTypes.string,
  saveHandler: PropTypes.func,
  handler: PropTypes.func,
  isEdit: PropTypes.bool,
  crudCreate: PropTypes.func,
  crudUpdate: PropTypes.func,
  handleSubmitWithRedirect: PropTypes.func
};

export default connect(null, { saveHandler, crudCreate, crudUpdate })(SaveFormBtn);
