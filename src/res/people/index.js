import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { ShowGuesser, EditGuesser } from 'react-admin';
import PersonList from './PersonList';

export default {
  list: PersonList,
  show: ShowGuesser,
  edit: EditGuesser,
  icon: AccountBoxIcon
};
