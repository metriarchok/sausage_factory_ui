import React from 'react';
import {
  List,
  Filter,
  TextInput,
  Datagrid,
  TextField,
  NumberField,
  UrlField,
  DateField,
  SelectInput,
  LoadingIndicator,
  useQueryWithStore
} from 'react-admin';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import LaunchIcon from '@material-ui/icons/Launch';

const SearchFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn autoComplete="off" />
    <SelectInput
      source="year"
      label="Year"
      alwaysOn
      choices={[
        { id: '1', name: 'All Years' },
        { id: '2', name: 'Current Year' },
        { id: '3', name: 'Recent Years' },
        { id: '4', name: 'Prior Year' },
        { id: '2018', name: '2018' },
        { id: '2017', name: '2017' },
        { id: '2016', name: '2016' },
        { id: '2015', name: '2015' },
        { id: '2014', name: '2014' },
        { id: '2013', name: '2013' },
        { id: '2012', name: '2012' },
        { id: '2011', name: '2011' },
        { id: '2010', name: '2010' },
        { id: '2009', name: '2009' },
        { id: '2008', name: '2008' }
      ]}
    />
    <SelectInput
      source="state"
      label="State"
      alwaysOn
      choices={[
        { id: 'OK', name: 'Oklahoma' },
        { id: 'US', name: 'United States' }
      ]}
    />
  </Filter>
);

const ReferenceExistsField = ({ source, record = {} }) => {
  const id = record[source];
  const history = useHistory();
  const { loading, error } = useQueryWithStore({
    type: 'getOne',
    basePath: '/bills',
    resource: 'bills',
    payload: { id: id }
  });
  if (loading) return <LoadingIndicator />;
  if (error)
    return (
      <IconButton>
        <SaveIcon />
      </IconButton>
    );
  else
    return (
      <IconButton>
        <LaunchIcon onClick={() => history.push(`/bills/${id}/show`)} />
      </IconButton>
    );
};
ReferenceExistsField.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

const LegiscanSearch = props => {
  let history = useHistory();
  return (
    <List
      {...props}
      page={1}
      perPage={50}
      setSort={{ field: 'relevance', order: 'DESC' }}
      filters={<SearchFilter />}
      filterDefaultValues={{ state: 'OK', year: '2' }}
      bulkActionButtons={false}>
      <Datagrid rowClick={id => history.push(`/ls/bill/${id.toString()}/show`)}>
        <TextField source="id" />
        <TextField source="bill_number" />
        <TextField source="title" sortable="true" />
        <NumberField source="relevance" />
        <TextField source="state_abbr" />
        <UrlField source="url" />
        <DateField source="last_action_date" sortable="true" />
        <TextField source="last_action" />
        <ReferenceExistsField label="Saved" source="id" resource="bills" />
      </Datagrid>
    </List>
  );
};

export default LegiscanSearch;
