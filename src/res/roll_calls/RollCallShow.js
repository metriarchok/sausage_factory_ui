import React from 'react';
import {
  DateField,
  SimpleShowLayout,
  ReferenceField,
  ArrayField,
  NumberField,
  Show,
  TextField,
  Datagrid
} from 'react-admin';

const RollCallShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="bill_id" reference="bills">
        <TextField source="id" />
      </ReferenceField>
      <TextField source="desc" />
      <DateField source="date" />
      <NumberField source="passed" />

      <NumberField source="yea" />
      <NumberField source="nay" />
      <NumberField source="nv" />
      <NumberField source="total" />
      <NumberField source="absent" />

      <ReferenceField source="chamber_id" reference="chambers">
        <TextField source="id" />
      </ReferenceField>

      <ArrayField source="votes">
        <Datagrid>
          <ReferenceField source="people_id" reference="people">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="vote_text" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export default RollCallShow;
