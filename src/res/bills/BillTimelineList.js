import React from 'react';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { format } from 'date-fns';
import HeightIcon from '@material-ui/icons/Height';

import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import EventIcon from '@material-ui/icons/Event';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

import arrayMove from 'array-move';
import { List, TextField, NumberField, Pagination } from 'react-admin';

import PropTypes from 'prop-types';

import BillTimelineEditForm from './BillTimelineEditForm';

const useStyles = makeStyles(theme => ({
  card: {
    width: '93%',
    display: 'inline-block',
    marginBottom: '10px',
    marginTop: '10px',
    verticalAlign: 'top',
    borderLeftWidth: '24px!important',
    borderLeftStyle: 'solid!important',
    borderLeftColor: theme.palette.primary.dark,
    padding: '0!important'
  },
  cardContent: {
    padding: '0!important'
  },
  displayOnly: {
    color: 'rgba(0, 0, 0, 0.87) !important'
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
  dragHandle: {
    position: 'relative',
    top: '65px',
    opacity: '0%',
    '&:hover': {
      opacity: '100%'
    }
  },
  cardWrapper: {
    minWidth: '600px',
    marginTop: '-36px'
  },
  dateHeader: {
    width: '100%',
    marginBottom: '0'
  }
}));

const TimelineItemAvatar = ({ eventType }) => {
  switch (eventType) {
    case 'history':
      return <HistoryIcon />;
    case 'calendar':
      return <EventIcon />;
    case 'progress':
      return <TimelineIcon />;
    case 'text':
      return <TextFieldsIcon />;
    case 'vote':
      return <ThumbsUpDownIcon />;
    default:
      return <HistoryIcon />;
  }
};
TimelineItemAvatar.propTypes = {
  eventType: PropTypes.string
};

const TimelineSortableItem = sortableElement(props => {
  const classes = useStyles();

  const { id, tlRecord, currentTrackerItem, handleClick, expanded, showDate } = props;

  const handleExpandClick = () => {
    handleClick(id);
  };

  return (
    <div>
      {showDate ? (
        <Typography variant="caption" className={classes.dateHeader}>
          {tlRecord.date}
        </Typography>
      ) : null}

      <div className={classes.cardWrapper}>
        <div className={classes.dragHandle}>
          <DragHandle />
        </div>
        <Card key={id} className={classes.card}>
          <CardActionArea
            className={classes.cardContent}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CardHeader
              title={<TextField record={tlRecord} source="title" />}
              subheader={
                <Grid container alignItems="center" className={classes.subhead}>
                  <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                    Order:&nbsp;
                    <NumberField record={tlRecord} source="eventIndex" />
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                    Date:&nbsp; {format(new Date(`${props.tlRecord.date} 00:00:00.000Z GMT-0600`), 'MM/dd/yyyy')}
                  </Typography>
                  <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                    Type:&nbsp;
                    <TextField record={tlRecord} source="eventType" />
                  </Typography>
                </Grid>
              }
              avatar={<TimelineItemAvatar eventType={tlRecord.eventType} />}
            />
          </CardActionArea>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.cardContent}>
              <BillTimelineEditForm
                resource="bill_timeline"
                currentTrackerItem={currentTrackerItem}
                record={tlRecord}
                basePath="/bill_timeline"
                redirect={`/bills/${id}/show`}
                {...props}
              />
            </CardContent>
          </Collapse>
          <CardActions style={{ textAlign: 'right', display: 'none' }} />
        </Card>
      </div>
    </div>
  );
});
TimelineSortableItem.propTypes = {
  id: PropTypes.string,
  tlRecord: PropTypes.object,
  basePath: PropTypes.string,
  showDate: PropTypes.bool
};

const DragHandle = sortableHandle(() => <HeightIcon />);

class BillTimelineGrid extends React.Component {
  constructor(_props) {
    super();
    console.log(_props);
    this.state = {
      timeline: [],
      basePath: _props.basePath,
      ids: _props.ids,
      loaded: _props.loaded,
      data: _props.data,
      currentTrackerItem: {},
      selectedTimelineItem: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data || nextProps.currentTrackerItem !== prevState.currentTrackerItem) {
      return {
        data: nextProps.data,
        timeline: Object.entries(nextProps.data)
          .map(i => i[1])
          .sort((a, b) => a.eventIndex - b.eventIndex),
        currentTrackerItem: nextProps.currentTrackerItem
      };
    } else return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (this.state.timeline[oldIndex].date === this.state.timeline[newIndex].date) {
      const newTimeline = arrayMove(this.state.timeline, oldIndex, newIndex).map((item, index) => {
        return {
          id: item.id,
          eventIndex: index,
          eventType: item.eventType,
          date: item.date,
          time: item.time,
          title: item.title,
          description: item.description,
          chamber: item.chamber,
          data: item.data
        };
      });
      this.setState({ timeline: newTimeline });
    }
  };

  handleTimelineSortableItemSelect = id => {
    this.state.selectedTimelineItem === id
      ? this.setState({ selectedTimelineItem: '' })
      : this.setState({ selectedTimelineItem: id });
  };
  render() {
    return (
      <TimelineSortable useDragHandle onSortEnd={this.onSortEnd}>
        {this.state.timeline.map((item, i, tl) => {
          return (
            <React.Fragment key={`frag-${item.id}`}>
              <TimelineSortableItem
                handleClick={this.handleTimelineSortableItemSelect}
                expanded={this.state.selectedTimelineItem === item.id}
                key={item.id}
                id={item.id}
                tlRecord={item}
                index={i}
                basePath={this.state.basePath}
                currentTrackerItem={this.state.currentTrackerItem}
                showDate={i === 0 || tl[i - 1].date !== item.date}
              />
            </React.Fragment>
          );
        })}
      </TimelineSortable>
    );
  }
}
BillTimelineGrid.propTypes = {
  data: PropTypes.object,
  currentTrackerItem: PropTypes.object
};

const TimelineSortable = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const BillTimelineList = props => {
  const { currentTrackerItem, id } = props;
  return (
    <List
      currentTrackerItem={currentTrackerItem}
      title="API Timeline"
      filter={{ bill_id: id }}
      sort={{ field: 'eventIndex', order: 'DESC' }}
      perPage={100}
      actions={<CardActions hidden />}
      pagination={<Pagination perPage={100} hidden />}
      style={{ width: '100%!important' }}
      {...props}
    >
      <BillTimelineGrid currentTrackerItem={currentTrackerItem} {...props} />
    </List>
  );
};
BillTimelineList.propTypes = {
  currentTrackerItem: PropTypes.object,
  id: PropTypes.string
};

export default BillTimelineList;
