import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { ReferenceInput, SelectInput } from 'react-admin';

import BillQuickPreviewButton from './BillQuickPreviewButton';

const BillReferenceInput = props => (
  <Fragment>
    <ReferenceInput {...props}>
      <SelectInput optionText="title" />
    </ReferenceInput>

    {/* We use Field to get the current value of the `post_id` field */}
    <Field name="bill_id" component={({ input }) => input.value && <BillQuickPreviewButton id={input.value} />} />
  </Fragment>
);

export default BillReferenceInput;
