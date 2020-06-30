import React from 'react';
import { makeStyles } from '@material-ui/core';

import { List, CardActions, Pagination } from 'react-admin';
import PropTypes from 'prop-types';
import BillTrackerTimelineCard from './BillTrackerTimelineCard';

const useStyles = makeStyles(theme => ({
  cardWrapper: {
    marginBottom: '10px',
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
    height: '200px',
    visibility: 'hidden'
  }
}));

const TrackerTimelineSortableItem = props => {
  const classes = useStyles();
  return (
    <div className={classes.cardWrapper}>
      {props.showDate ? <div className={classes.dateSpan}>{props.tlRecord.date}</div> : null}
      <BillTrackerTimelineCard {...props} />
    </div>
  );
};
TrackerTimelineSortableItem.propTypes = {
  showDate: PropTypes.bool,
  tlRecord: PropTypes.object
};

const BillTrackerTimelineGrid = ({ ids, data, basePath }) =>
  ids.map(i => (
    <div style={{ padding: '20px' }}>
      <React.Fragment key={`frag-${data[i].id}`}>
        <TrackerTimelineSortableItem
          key={data[i].id}
          tlRecord={data[i]}
          index={i}
          basePath={basePath}
          showDate={false}
        />
      </React.Fragment>
    </div>
  ));

const BillTrackerTimelineList = props => {
  return (
    <List
      title="Tracker Timeline"
      sort={{ field: 'date', order: 'ASC' }}
      actions={<CardActions hidden />}
      pagination={<Pagination perPage={25} />}
      style={{ minHeight: '1000px' }}
      filter={{ show_in_timeline: true }}
      {...props}
    >
      <BillTrackerTimelineGrid {...props} style={{ position: 'sticky', top: '0', padding: '20px' }} />
    </List>
  );
};
BillTrackerTimelineList.propTypes = {
  showDate: PropTypes.bool,
  tlRecord: PropTypes.object
};
export default BillTrackerTimelineList;
