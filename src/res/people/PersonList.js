import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { ReferenceField, ShowButton, Datagrid, List, Responsive, SimpleList, TextField, DateField } from 'react-admin';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const PersonList = withStyles(styles)(({ classes, ...props }) => (
  <List rowClick="show" {...props} sort={{ field: 'last_name', order: 'DESC' }}>
    <Responsive
      small={
        <SimpleList linkType="show" primaryText={record => record.bill_number} secondaryText={record => record.title} />
      }
      medium={
        <Datagrid rowClick="show">
          <TextField source="id" />
          <TextField source="last_name" />
          <TextField source="first_name" />
          <TextField source="district" />
          <DateField source="created" />
          <TextField source="middle_name" />
          <TextField source="nickname" />
          <TextField source="name" />
          <TextField source="suffix" />
          <ReferenceField source="party_id" reference="parties">
            <TextField source="party_abbr" />
          </ReferenceField>
          <ReferenceField source="role_id" reference="role_types">
            <TextField source="role_name" />
          </ReferenceField>
          <ReferenceField source="state_id" reference="states">
            <TextField source="id" />
          </ReferenceField>
          <DateField source="updated" />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

export default PersonList;
