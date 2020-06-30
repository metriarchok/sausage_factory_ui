import BookIcon from '@material-ui/icons/Book';
import { ShowGuesser, EditGuesser } from 'react-admin';
import BillTimelineList from './BillTimelineList';

export default {
  list: BillTimelineList,
  show: ShowGuesser,
  edit: EditGuesser,
  icon: BookIcon
};
