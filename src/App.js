import React from 'react';
import { Admin, Resource } from 'react-admin';
import { base64Uploader, AuthProvider, RestProvider } from './lib';
import AppLayout from './AppLayout';

import { UserList, UserEdit, UserCreate } from './res/users/Users';

import comments from './res/comments';
import bills from './res/bills';
import bill_timeline from './res/bill_timeline';
import people from './res/people';
import parties from './res/parties';
import bodies from './res/bodies';
import committees from './res/committees';
import bill_types from './res/bill_types';
import mime_types from './res/mime_types';
import sponsor_types from './res/sponsor_types';
import role_types from './res/role_types';
import states from './res/states';
import sessions from './res/sessions';
import session_bills from './res/session_bills';
import roll_calls from './res/roll_calls';
import tracker_steps from './res/tracker_steps';
import bill_tracker_timeline from './res/bill_tracker_timeline';

import LegiscanSearch from './res/legiscan/LegiscanSearch';
import LegiscanBill from './res/legiscan/LegiscanBill';

import { createMuiTheme } from '@material-ui/core/styles';
import themeJson from './theme.json';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

import config from './config/firebaseConfig.json';

const theme = createMuiTheme(themeJson);

const firebaseConfig = config.default;

const trackedResources = [
  { name: 'posts' },
  { name: 'users' },
  { name: 'bills' },
  { name: 'comments' },
  { name: 'people' },
  { name: 'parties' },
  { name: 'bodies' },
  { name: 'committees' },
  { name: 'chambers' },
  { name: 'bill_types' },
  { name: 'mime_types' },
  { name: 'sponsor_types' },
  { name: 'role_types' },
  { name: 'states' },
  { name: 'sessions' },
  { name: 'senate' },
  { name: 'session_bills' },
  { name: 'roll_calls' },
  { name: 'tracker_steps' },
  { name: 'bill_tracker_timeline' },
  { name: 'bill_timeline' }
];

const authConfig = {
  userProfilePath: '/users/',
  userAdminProp: 'isAdmin'
};

// to run this demo locally, please feel free to disable authProvider to bypass login page
const dataProvider = base64Uploader(
  RestProvider(firebaseConfig, {
    trackedResources
  })
);

const App = () => (
  <Admin theme={theme} layout={AppLayout} dataProvider={dataProvider} authProvider={AuthProvider(authConfig)}>
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={PersonIcon} />

    <Resource options={{ label: 'Saved Bills' }} name="bills" {...bills} />
    <Resource noLayout name="bill_timeline" {...bill_timeline} />
    <Resource name="bill_tracker_timeline" {...bill_tracker_timeline} />
    <Resource name="comments" {...comments} />
    <Resource noLayout name="people" {...people} />

    <Resource name="parties" {...parties} />

    <Resource name="bodies" {...bodies} />
    <Resource name="chambers" {...bodies} />
    <Resource name="committees" {...committees} />
    <Resource name="bill_types" {...bill_types} />
    <Resource name="mime_types" {...mime_types} />
    <Resource name="sponsor_types" {...sponsor_types} />
    <Resource name="role_types" {...role_types} />
    <Resource name="states" {...states} />
    <Resource name="sessions" {...sessions} />
    <Resource name="session_bills" {...session_bills} />
    <Resource name="roll_calls" {...roll_calls} />
    <Resource name="tracker_steps" {...tracker_steps} />
    <Resource options={{ label: 'LegiScan Search' }} name="ls/search" icon={SearchIcon} list={LegiscanSearch} />
    <Resource name="ls/bill" show={LegiscanBill} />
    <Resource name="progress_status" noLayout />
  </Admin>
);
export default App;
