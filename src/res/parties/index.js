import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { ShowGuesser, EditGuesser } from 'react-admin';
import PartyList from './PartyList';

export default {
  list: PartyList,
  show: ShowGuesser,
  edit: EditGuesser,
  icon: GroupWorkIcon
};
