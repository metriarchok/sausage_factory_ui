import React from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { makeStyles, Typography } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { format } from 'date-fns';
import arrayMove from 'array-move';

import { List, CardActions, Pagination } from 'react-admin';
import PropTypes from 'prop-types';
import BillTrackerTimelineCard from '../bill_tracker_timeline/BillTrackerTimelineCard';
import BillTrackerTimelineQuickEditButton from './BillTrackerTimelineQuickEditButton';
import BillTrackerTimelineDeleteButton from './BillTrackerTimelineDeleteButton';

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    marginBottom: '10px',
    flexGrow: 1,
    marginTop: '10px',
    marginLeft: '20px',
    marginRight: '20px',
    '&:hover $trackerTimelineItemToolbar': {
      visibility: 'visible'
    }
  },
  subhead: {
    width: 'fit-content'
  },
  subheadItem: {
    marginRight: '10px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: '#ff0000'
  },
  trackerTimelineItemToolbar: {
    position: 'absolute',
    right: '18px',
    backgroundColor: theme.palette.common.white,
    opacity: '0.8',
    zIndex: 100,
    borderColor: '#fff',
    borderStyle: 'dash',
    width: '60px',
    textAlign: 'center',
    visibility: 'hidden'
  },
  dateHeader: {
    textAlign: 'right',
    fontSize: 'medium',
    fontWeight: 'bold',
    marginBottom: '12px'
  }
}));

const TrackerTimelineSortableItem = sortableElement(props => {
  const classes = useStyles();

  return (
    <div className={classes.cardWrapper}>
      {props.showDate ? (
        <Typography variant="h4" className={classes.dateHeader}>
          {format(new Date(`${props.tlRecord.date} 00:00:00.000Z GMT-0600`), 'MMMM d, yyyy')}
        </Typography>
      ) : null}
      <div className={classes.trackerTimelineItemToolbar}>
        {props.tlRecord.order > 0 ? (
          <div className={classes.dragHandle}>
            <DragHandle />
          </div>
        ) : null}

        <div className={classes.editButton}>
          <BillTrackerTimelineQuickEditButton {...props} />
        </div>
        {props.tlRecord.order > 0 ? (
          <div className={classes.deleteButton}>
            <BillTrackerTimelineDeleteButton {...props} />
          </div>
        ) : null}
      </div>
      <BillTrackerTimelineCard {...props} />
    </div>
  );
});

const DragHandle = sortableHandle(() => <DragHandleIcon />);

class BillTrackerTimelineGrid extends React.Component {
  constructor(_props) {
    super();
    this.state = {
      timeline: [],
      basePath: _props.basePath,
      ids: _props.ids,
      loaded: _props.loaded,
      data: _props.data,
      currentTrackerStep: {}
    };
  }

  removeTimelineItem({ order }) {
    this.onSortEnd(order, this.state.timeline.length - 1);
    var newTimeline = [...this.state.timeline];
    newTimeline.pop();
    this.setState({ timeline: newTimeline });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      const currentStep = Object.entries(nextProps.data)
        .map(i => i[1])
        .sort((a, b) => b.order - a.order)[0];
      nextProps.setCurrent(currentStep);
      return {
        data: nextProps.data,
        timeline: Object.entries(nextProps.data)
          .map(i => i[1])
          .sort((a, b) => a.order - b.order),
        currentTrackerStep: currentStep
      };
    } else return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (this.state.timeline[oldIndex].date === this.state.timeline[newIndex].date) {
      const newTimeline = arrayMove(this.state.timeline, oldIndex, newIndex).map((item, index) => {
        return {
          action: item.action,
          bill_id: item.bill_id,
          body_name: item.body_name,
          body_id: item.body_id,
          callout_text: item.callout_text,
          committee_id: item.committee_id,
          committee_name: item.committee_name,
          current_timeline_step_id: item.current_timeline_step_id,
          date: item.date,
          duration: item.duration,
          internal_notes: item.internal_notes,
          move_to_timeline_step_id: item.move_to_timeline_step_id,
          order: index,
          ref_timeline_ids: item.ref_timeline_ids,
          sentiment: item.sentiment,
          summary_text: item.summary_text,
          time: item.time,
          tracker_path_id: item.tracker_path_id
        };
      });
      this.setState({ timeline: newTimeline });
    }
  };
  render() {
    return (
      <div style={{ minHeight: '1000px', padding: '20px' }}>
        <TrackerTimelineSortable
          style={{ position: 'sticky', top: 0 }}
          useDragHandle
          onSortEnd={this.onSortEnd}
          currentTrackerStep={this.currentTrackerStep}
        >
          {this.state.timeline.map((item, i, array) => {
            return (
              <React.Fragment key={`frag-${item.id}`}>
                <TrackerTimelineSortableItem
                  currentTrackerStep={this.currentTrackerStep}
                  key={item.id}
                  tlRecord={item}
                  index={i}
                  basePath={this.state.basePath}
                  showDate={i === 0 || this.state.timeline[i - 1].date !== item.date}
                  removeTimelineItem={this.removeTimelineItem}
                />
              </React.Fragment>
            );
          })}
        </TrackerTimelineSortable>
      </div>
    );
  }
}
BillTrackerTimelineGrid.propTypes = {
  data: PropTypes.object,
  setCurrent: PropTypes.func
};

const TrackerTimelineSortable = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const BillTrackerTimelineList = props => {
  const { id } = props;
  return (
    <List
      title="Tracker Timeline"
      filter={{ bill_id: id }}
      sort={{ field: 'order', order: 'DESC' }}
      actions={<CardActions hidden />}
      pagination={<Pagination perPage={100} hidden />}
      style={{ minHeight: '1000px' }}
      {...props}
    >
      <BillTrackerTimelineGrid {...props} style={{ position: 'sticky', top: '0', padding: '20px' }} />
    </List>
  );
};
BillTrackerTimelineList.propTypes = {
  id: PropTypes.string
};
export default BillTrackerTimelineList;
