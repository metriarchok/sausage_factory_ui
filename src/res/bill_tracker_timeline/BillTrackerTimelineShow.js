import React from 'react';
import { DateField, NumberField, TextField, Show, SimpleShowLayout, ReferenceField, BooleanField } from 'react-admin';

const BillTrackerTimelineShow = props => {
  console.log(props);
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="action" />

        <TextField source="body_name" />
        <TextField source="callout_text" />

        <TextField source="committee_name" />
        <TextField source="curent_tracker_step" />

        <DateField source="date" />
        <NumberField source="duration" />
        <BooleanField source="in_committee" />
        <TextField source="internal_notes" />

        <NumberField source="sentiment" />
        <TextField source="summary_text" />
        <DateField source="time" />

        <ReferenceField
          source="tracker_step_id"
          basePath="tracker_steps"
          resource="tracker_steps"
          reference="tracker_steps"
        >
          <TextField source="id" />
        </ReferenceField>
        <ReferenceField
          source="trigger_timeline_id"
          basePath="/bill_timeline"
          resource="bill_timeline"
          reference="bill_timeline"
        >
          <TextField source="id" />
        </ReferenceField>
        <TextField source="id" />
      </SimpleShowLayout>
    </Show>
  );
};

export default BillTrackerTimelineShow;
