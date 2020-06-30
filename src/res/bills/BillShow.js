import React, { useState } from 'react';
import {
  DateField,
  SimpleShowLayout,
  ReferenceField,
  ArrayField,
  NumberField,
  Show,
  TextField,
  TopToolbar,
  Button,
  TabbedShowLayout,
  Tab,
  Datagrid,
  ReferenceManyField,
  ShowButton,
  EditButton,
  Filter,
  SelectInput,
  UrlField
} from 'react-admin';

import PropTypes from 'prop-types';
import FabField from '../../comp/Fields/FabField';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles, Chip, Typography } from '@material-ui/core';
import AddCommentButton from './AddCommentButton';

import BillTimelineList from './BillTimelineList';
import BillTrackerTimelineList from './BillTrackerTimelineList';
import BillEdit from './BillEdit';
import SubjectsField from '../../comp/Fields/SubjectsField';
const useStyles = makeStyles({
  billTitle: { fontWeight: 'bold', fontSize: '24px', width: '100%' },
  raFieldLeft: { paddingRight: '18px', float: 'left' },
  raFieldRight: { paddingRight: '10px', float: 'left' },
  raFieldClearBoth: { clear: 'both', height: '18px', width: '100%' },
  raFieldClearLeft: { clear: 'left', height: '18px', width: '100%' },
  raTimelineRef: {
    paddingRight: '18px',
    minHeight: '1000px',
    float: 'left',
    maxWidth: '600px'
  },
  timelineContainer: {
    maxWidth: '100%'
  },
  raTrackerTimelineRef: { marginLeft: '18px', position: '-webkit-sticky', top: '0' }
});

const BillShowActions = ({ data }) => (
  <TopToolbar style={{ justifyContent: 'flex-start' }}>
    {/* Add your custom actions */}
    <Button
      color="primary"
      onClick={() => {
        console.log('hello');
        //saveBill(data.id.toString());
      }}>
      Save Bill
    </Button>
  </TopToolbar>
);

BillShowActions.propTypes = {
  data: PropTypes.object
};

const DateFilter = props => {
  var dateChoices = [];
  Object.entries({ ...props.data }).map(d => {
    dateChoices.push({ date: d[1].date, date_string: d[1].date.toString() });
  });
  return (
    <Filter {...props} displayedFilters={{ date: true }} alwaysOn>
      <SelectInput choices={dateChoices} source="date" optionValue="date" optionText="date_string" />
    </Filter>
  );
};
DateFilter.propTypes = {
  data: PropTypes.object
};

const BillShow = props => {
  const classes = useStyles();
  const [currentTrackerItem, setCurrentTrackerItem] = useState();
  const setCurrentTimelineTracker = item => {
    setCurrentTrackerItem(item);
  };

  return (
    <Show style={{ width: '86vw' }} {...props}>
      <SimpleShowLayout>
        <TextField addLabel={false} className={classes.billTitle} source="title" />
        <TextField source="description" className={classes.raField100} />
        <div className={classes.raFieldClearLeft} />
        <Typography variant="body2" component="span">
          Subjects
        </Typography>
        <SubjectsField />
        <div className={classes.raFieldClearLeft} />
        <TextField className={classes.raFieldLeft} source="bill_number" />
        <ReferenceField className={classes.raFieldLeft} source="session_id" reference="sessions">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="state" className={classes.raFieldLeft} />
        <ReferenceField source="bill_type_id" className={classes.raFieldLeft} reference="bill_types">
          <TextField source="bill_type_name" />
        </ReferenceField>
        <TextField source="body" className={classes.raFieldLeft} />
        <FabField source="url" content={<OpenInNewIcon />} label="LegiScan" className={classes.raFieldLeft} />
        <FabField source="state_link" content={<OpenInNewIcon />} label="State" className={classes.raFieldLeft} />
        <div className={classes.raFieldClearLeft} />
        <NumberField source="completed" className={classes.raFieldLeft} />

        <ReferenceField source="status" className={classes.raFieldLeft} reference="progress_status">
          <TextField source="progress_desc" />
        </ReferenceField>
        <DateField source="status_date" className={classes.raFieldLeft} />
        <TextField source="current_body" className={classes.raFieldLeft} />
        <TextField source="committee.name" className={classes.raFieldLeft} />
        <div className={classes.raFieldClearLeft} />
        <TabbedShowLayout>
          <Tab label="Edit Summary">
            <BillEdit basePath="/bills" redirect={false} {...props} />
          </Tab>
          <Tab className={classes.timelineContainer} label="Timeline">
            <ReferenceManyField
              addLabel={false}
              reference="bill_timeline"
              target="bill_id"
              source="id"
              className={classes.raTimelineRef}>
              <BillTimelineList
                {...props}
                currentTrackerItem={currentTrackerItem}
                className={classes.billTimelineList}
              />
            </ReferenceManyField>

            <ReferenceManyField
              addLabel={false}
              reference="bill_tracker_timeline"
              target="bill_id"
              source="id"
              perPage={100}
              className={classes.raTrackerTimelineRef}>
              <BillTrackerTimelineList setCurrent={setCurrentTimelineTracker} {...props} />
            </ReferenceManyField>
          </Tab>

          <Tab label="Comments" path="comments">
            <AddCommentButton />
            <ReferenceManyField
              addLabel={false}
              reference="comments"
              target="bill_id"
              sort={{ field: 'created_at', order: 'DESC' }}>
              <Datagrid>
                <DateField source="created_at" />
                <TextField source="body" />
                <ShowButton />
                <EditButton />
              </Datagrid>
            </ReferenceManyField>
          </Tab>

          <Tab label="history">
            <ArrayField source="progress" className={classes.raFieldLeft}>
              <Datagrid>
                <DateField source="date" />
                <ReferenceField source="event" reference="progress_status">
                  <TextField source="progress_desc" />
                </ReferenceField>
              </Datagrid>
            </ArrayField>
            <ArrayField source="history" className={classes.raFieldLeft}>
              <Datagrid>
                <DateField source="date" />
                <TextField source="action" />
                <ReferenceField source="chamber_id" reference="bodies">
                  <TextField source="body_abbr" />
                </ReferenceField>
                <NumberField source="importance" />
              </Datagrid>
            </ArrayField>
          </Tab>

          <Tab label="sponsors">
            <ArrayField source="sponsors">
              <Datagrid>
                <NumberField source="sponsor_order" />
                <ReferenceField source="person_id" reference="people">
                  <TextField source="person_id" />
                </ReferenceField>
                <TextField source="nickname" />
                <ReferenceField source="party_id" reference="parties">
                  <TextField source="party_abbr" />
                </ReferenceField>
                <TextField source="district" />
                <NumberField source="committee_sponsor" />
                <ReferenceField source="committee_id" reference="committees">
                  <TextField source="committees.committee_name" />
                </ReferenceField>
              </Datagrid>
            </ArrayField>
          </Tab>

          <Tab label="texts">
            <ArrayField source="texts">
              <Datagrid>
                <ReferenceField source="doc_id" reference="docs">
                  <TextField source="id" />
                </ReferenceField>
                <DateField source="date" />
                <TextField source="type" />
                <ReferenceField source="type_id" reference="meta/billTextTypes">
                  <TextField source="bill_text_name" />
                </ReferenceField>
                <TextField source="mime" />
                <ReferenceField source="mime_id" reference="meta/mimeTypes">
                  <TextField source="mime_type" />
                </ReferenceField>
                <UrlField source="url" />
                <UrlField source="state_link" />
                {/* <NumberField source="text_size" /> */}
              </Datagrid>
            </ArrayField>
          </Tab>

          <Tab label="votes">
            <ArrayField source="votes">
              <Datagrid rowClick="show">
                <ReferenceField source="roll_call_id" reference="roll_calls">
                  <TextField source="roll_call_id" />
                </ReferenceField>
                <DateField source="date" />
                <TextField source="desc" />
                <TextField source="chamber" />
                <NumberField source="passed" />
                <NumberField source="yea" />
                <NumberField source="nay" />
                <NumberField source="nv" />
                <NumberField source="absent" />
                <NumberField source="total" />
                <UrlField source="url" />
              </Datagrid>
            </ArrayField>
          </Tab>
          <Tab label="ammendments">
            <TextField source="amendments" />
          </Tab>
          <Tab label="supplements">
            <TextField source="supplements" />
          </Tab>
          <Tab label="calendar">
            <TextField source="calendar" />
          </Tab>
        </TabbedShowLayout>
      </SimpleShowLayout>
    </Show>
  );
};

BillShow.propTypes = {
  record: PropTypes.object
};
export default BillShow;
