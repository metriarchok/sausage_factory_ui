import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { ShowButton, Datagrid, List, Responsive, SimpleList, TextField } from 'react-admin';

const styles = theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

const PartyList = withStyles(styles)(({ classes, ...props }) => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          linkType="show"
          primaryText={record => record.party_id}
          secondaryText={record => record.party_name}
        />
      }
      medium={
        <Datagrid rowClick="edit">
          <TextField source="party_id" />
          <TextField source="party_abbr" />
          <TextField source="party_name" />
          <TextField source="party_short" />
          <TextField source="id" />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
));

export default PartyList;
