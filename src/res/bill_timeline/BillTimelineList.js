import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Datagrid, List, TextField, DateField, ReferenceField, NumberField } from 'react-admin';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const BillTimelineList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props} perPage={100} sort={{ field: 'date', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <ReferenceField source="bill_id" reference="bills">
        <TextField source="bill_number" />
      </ReferenceField>
      <DateField source="date" />
      <NumberField source="eventIndex" />
      <TextField source="eventType" />
      <TextField source="chamber" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="timelineSteps" />
    </Datagrid>
  </List>
));

export default BillTimelineList;
