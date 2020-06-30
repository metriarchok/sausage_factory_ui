import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { EditGuesser } from 'react-admin';
import RollCallList from './RollCallList';
import RollCallShow from './RollCallShow';

export default {
  list: RollCallList,
  show: RollCallShow,
  edit: EditGuesser,
  icon: AccountBoxIcon
};
