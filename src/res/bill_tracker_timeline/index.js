import BookIcon from '@material-ui/icons/Book';
import { EditGuesser } from 'react-admin';
import BillTrackerTimelineShow from './BillTrackerTimelineShow';
import BillTrackerTimelineList from './BillTrackerTimelineList';

export default {
  list: BillTrackerTimelineList,
  show: BillTrackerTimelineShow,
  edit: EditGuesser,
  icon: BookIcon
};
