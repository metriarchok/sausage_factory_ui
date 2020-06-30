import React from 'react';
import { Create, TextInput, SimpleForm, TopToolbar, ListButton } from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import RichTextInput from 'ra-input-rich-text';
import './tracker_create_css.css';

const TrackerStepEdit = props => (
  <Create {...props}>
    <SimpleForm>
      <TopToolbar style={{ width: '100%', justifyContent: 'flex-start' }}>
        <ListButton basePath="tracker_steps" />
      </TopToolbar>
      <Box style={{ width: '100%' }} p="1em">
        <Box display="flex">
          <Box flex={2} mr="1em">
            <Typography variant="h6" gutterBottom>
              Content
            </Typography>
            <Box display="flex">
              <Box flex={1} mr="0.5em">
                <TextInput source="action" fullWidth />
              </Box>
              <Box flex={1} ml="0.5em">
                <TextInput source="chamber" fullWidth />
              </Box>
            </Box>
            <TextInput source="display_name" fullWidth />
            <TextInput source="key" fullWidth />
            <RichTextInput source="explanation" />
            <Box mt="1em" />
            <Typography variant="h6" gutterBottom>
              Layout
            </Typography>
            <Box display="flex">
              <Box flex={1} ml="0.5em">
                <TextInput label="Group ID" source="g_id" />
              </Box>
              <Box flex={1} mr="0.5em">
                <TextInput label="Path ID" source="path_id" />
              </Box>
            </Box>
            <TextInput source="path_d" multiline fullWidth />
            <Box display="flex">
              <Box flex={1} mr="0.5em">
                <TextInput source="class" fullWidth />
              </Box>
              <Box flex={2} ml="0.5em">
                <TextInput source="g_transform" fullWidth />
              </Box>
            </Box>
          </Box>

          <Box flex={1} ml="1em">
            <Typography variant="h6" gutterBottom>
              Connections
            </Typography>
          </Box>
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export default TrackerStepEdit;
