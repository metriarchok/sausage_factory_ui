import React, { useState } from 'react';
import {
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  UrlField,
  SimpleShowLayout,
  Show,
  ArrayField,
  TabbedShowLayout,
  Tab,
  SingleFieldList,
  TopToolbar,
  ChipField,
  useNotify,
  useRedirect,
  fetchStart,
  fetchEnd,
  Button
} from 'react-admin';
import FabField from '../../comp/Fields/FabField';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  billTitle: { fontWeight: 'bold', fontSize: '24px', width: '100%' },

  raFieldLeft: { paddingRight: '18px', float: 'left' },
  raFieldRight: { paddingRight: '10px', float: 'left' },
  raFieldClearBoth: { clear: 'both', height: '18px', width: '100%' },
  raFieldClearLeft: { clear: 'left', height: '18px', width: '100%' }
});

const BillSaveButton = ({ record }) => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    const id = record.bill_id.toString();
    console.log(id);
    setLoading(true);
    dispatch(fetchStart()); // start the global loading indicator

    fetch(`https://us-central1-legislative-toolkit.cloudfunctions.net/legiscanApi/ls/save/${id}`, {
      mode: 'no-cors',
      method: 'POST'
    })
      .then(() => {
        notify('Bill saved successfully');
        redirect(`/bills/${id}/show`);
      })
      .catch(e => {
        notify('Error: bill not saved', 'warning');
      })
      .finally(() => {
        setLoading(false);
        dispatch(fetchEnd()); // stop the global loading indicator
      });
  };
  return <Button label="Save Bill" onClick={handleClick} disabled={loading} />;
};
BillSaveButton.propTypes = {
  record: PropTypes.object
};

const BillShowActions = ({ basePath, data, resource }) => {
  return (
    <TopToolbar style={{ justifyContent: 'flex-start' }}>
      {/* Add your custom actions */}
      <BillSaveButton record={data} />
    </TopToolbar>
  );
};
BillShowActions.propTypes = {
  basePath: PropTypes.string,
  data: PropTypes.object,
  resource: PropTypes.string
};

const LegiscanBill = props => {
  const classes = useStyles();
  return (
    <Show actions={<BillShowActions />} style={{ width: '86vw' }} {...props}>
      <SimpleShowLayout>
        <TextField addLabel={false} className={classes.billTitle} source="title" />
        <TextField source="description" className={classes.raField100} />
        <div className={classes.raFieldClearLeft} />
        <ArrayField source="subjects" className={classes.raFieldLeft}>
          <SingleFieldList>
            <ChipField source="subject_name" />
          </SingleFieldList>
        </ArrayField>
        <div className={classes.raFieldClearLeft} />
        <TextField className={classes.raFieldLeft} source="bill_number" />
        <ReferenceField className={classes.raFieldLeft} source="session_id" reference="sessions">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="state" className={classes.raFieldLeft} />
        <ReferenceField source="bill_type_id" className={classes.raFieldLeft} reference="bill_types">
          <TextField source="bill_type" />
        </ReferenceField>
        <TextField source="body" className={classes.raFieldLeft} />

        <FabField source="url" content={<OpenInNewIcon />} label="LegiScan" className={classes.raFieldLeft} />
        <FabField source="state_link" content={<OpenInNewIcon />} label="State" className={classes.raFieldLeft} />

        <div className={classes.raFieldClearLeft} />

        <NumberField source="completed" className={classes.raFieldLeft} />
        <NumberField source="status" className={classes.raFieldLeft} />
        <DateField source="status_date" className={classes.raFieldLeft} />

        <TextField source="current_body" className={classes.raFieldLeft} />

        <TextField source="committee.name" className={classes.raFieldLeft} />
        <div className={classes.raFieldClearLeft} />

        <div className={classes.raFieldClearLeft} />

        <TabbedShowLayout>
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
                <ReferenceField source="people_id" reference="people">
                  <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="party_id" reference="parties">
                  <TextField source="party_name" />
                </ReferenceField>

                <TextField source="role" />
                <TextField source="name" />
                <TextField source="first_name" />
                <TextField source="middle_name" />
                <TextField source="last_name" />
                <TextField source="suffix" />
                <TextField source="nickname" />
                <TextField source="district" />

                <NumberField source="sponsor_order" />
                <NumberField source="committee_sponsor" />
                <ReferenceField source="committee_id" reference="committees">
                  <TextField source="committee_name" />
                </ReferenceField>
              </Datagrid>
            </ArrayField>
          </Tab>
          <Tab label="status">
            <ArrayField source="sasts">
              <Datagrid>
                <ReferenceField source="type_id" reference="types">
                  <TextField source="id" />
                </ReferenceField>
                <TextField source="type" />
                <TextField source="sast_bill_number" />
                <ReferenceField source="sast_bill_id" reference="sast_bills">
                  <TextField source="id" />
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

                <TextField source="mime" />

                <UrlField source="url" />
                <UrlField source="state_link" />
                {/* <NumberField source="text_size" /> */}
              </Datagrid>
            </ArrayField>
          </Tab>
          <Tab label="votes">
            <ArrayField source="votes">
              <Datagrid>
                <TextField source="roll_call_id" />
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

export default LegiscanBill;
