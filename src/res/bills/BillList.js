import { withStyles, Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ShowButton,
  Datagrid,
  List,
  Responsive,
  SimpleList,
  TextField,
  DateField,
  ReferenceField,
  Filter,
  SelectInput,
  TextInput,
  RadioButtonGroupInput,
  LoadingIndicator
} from 'react-admin';
import { format } from 'date-fns';

import BooleanFuncField from '../../comp/Fields/BooleanFuncField';
import SubjectsField from '../../comp/Fields/SubjectsField';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const FSDateField = ({ source, record = {} }) => {
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  // The 0 there is the key, which sets the date to the epoch
  useEffect(() => {
    if (record[source] && record[source].seconds) {
      var d = new Date(0);
      d.setUTCSeconds(record[source].seconds);
      setDate(d);
    }
    setLoading(false);
  }, []);
  if (loading) return <LoadingIndicator />;
  if (!date) return null;

  return <span>{format(date, 'M/d/yyyy h:mm a')}</span>;
};
FSDateField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

const BillListFilter = props => (
  <Filter displayedFilters={{ completed: true }} {...props}>
    <TextInput label="Title" source="title" alwaysOn autoComplete="off" />
    <SelectInput
      source="status"
      label="Status"
      alwaysOn
      choices={[
        { id: 1, name: 'Introduced' },
        { id: 2, name: 'Engrossed' },
        { id: 3, name: 'Enrolled' },
        { id: 4, name: 'Passed' },
        { id: 5, name: 'Vetoed' },
        { id: 6, name: 'Failed' },
        { id: 7, name: 'Override' },
        { id: 8, name: 'Chaptered' },
        { id: 9, name: 'Referred' },
        { id: 10, name: 'Report Pass' },
        { id: 11, name: 'Report DNP' },
        { id: 12, name: 'Draft' }
      ]}
    />
    <TextInput label="Last Action" source="last_action" alwaysOn autoComplete="off" />

    <RadioButtonGroupInput
      source="completed"
      lable="Show..."
      alwaysOn
      choices={[
        { id: 0, name: 'Active Bills' },
        { id: 1, name: 'Inactive Bills' }
      ]}
    />
  </Filter>
);

const BillList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    bulkActionButtons={false}
    filters={<BillListFilter />}
    filterDefaultValues={{ state: 'OK', completed: 0 }}
    sort={{ field: 'last_action_date', order: 'DESC' }}>
    <Responsive
      small={
        <SimpleList linkType="show" primaryText={record => record.bill_number} secondaryText={record => record.title} />
      }
      medium={
        <Datagrid rowClick="show">
          <TextField source="state" />
          <ReferenceField source="session_id" reference="sessions">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="bill_number" />
          <TextField
            source="title"
            className="bill-title"
            headerClassName="bill-title-header"
            cellClassName="bill-title-cell"
          />
          <ReferenceField source="status" reference="progress_status">
            <TextField source="progress_desc" />
          </ReferenceField>
          <DateField source="last_action_date" />
          <TextField source="last_action" />
          <SubjectsField />
          <FSDateField source="createdOn" />
          <FSDateField source="updatedOn" />
          <BooleanFuncField
            source="completed"
            label="Active"
            booleanFunc={v => v === 0}
            valueLabelTrue="Active Bill"
            valueLabelFalse="Inactive Bill"
          />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

export default BillList;
