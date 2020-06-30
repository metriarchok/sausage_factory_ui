import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FalseIcon from '@material-ui/icons/Clear';
import TrueIcon from '@material-ui/icons/Done';
import { Tooltip, Typography } from '@material-ui/core';
import { useTranslate } from 'ra-core';
import sanitizeRestProps from './sanitizeRestProps';

const BooleanFuncField = ({
  className,
  classes: classesOverride,
  source,
  record = {},
  valueLabelTrue,
  valueLabelFalse,
  valueIconTrue,
  valueIconFalse,
  booleanFunc,
  ...rest
}) => {
  const translate = useTranslate();
  const sourceValue = get(record, source);
  const value = booleanFunc ? booleanFunc(sourceValue) : true;
  let ariaLabel = value ? valueLabelTrue : valueLabelFalse;

  if (!ariaLabel) {
    ariaLabel = value === false ? 'ra.boolean.false' : 'ra.boolean.true';
  }

  if (value === false) {
    return (
      <Typography component="span" variant="body2" className={className} {...sanitizeRestProps(rest)}>
        <Tooltip title={translate(ariaLabel, { _: ariaLabel })}>
          {valueIconFalse || <FalseIcon data-testid="false" />}
        </Tooltip>
      </Typography>
    );
  }

  if (value === true) {
    return (
      <Typography component="span" variant="body2" className={className} {...sanitizeRestProps(rest)}>
        <Tooltip title={translate(ariaLabel, { _: ariaLabel })}>
          {valueIconTrue || <TrueIcon data-testid="true" />}
        </Tooltip>
      </Typography>
    );
  }

  return <Typography component="span" variant="body2" className={className} {...sanitizeRestProps(rest)} />;
};
BooleanFuncField.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  source: PropTypes.string,
  record: PropTypes.object,
  valueLabelTrue: PropTypes.string,
  valueLabelFalse: PropTypes.string,
  booleanFunc: PropTypes.func,
  valueIconTrue: PropTypes.node,
  valueIconFalse: PropTypes.node
};

export default BooleanFuncField;
