import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Datagrid, List, TextField, DateField, NumberField, ReferenceField } from 'react-admin';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const RollCallList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <NumberField source="absent" />
      <ReferenceField source="bill_id" reference="bills">
        <TextField source="bill_number" />
      </ReferenceField>
      <TextField source="chamber" />
      <DateField source="date" />
      <TextField source="desc" />
      <NumberField source="nay" />
      <NumberField source="nv" />
      <NumberField source="passed" />
      <NumberField source="total" />
      <NumberField source="yea" />
      <TextField source="id" />
    </Datagrid>
  </List>
));

export default RollCallList;
