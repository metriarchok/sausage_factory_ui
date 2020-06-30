import React from 'react';
import ForwardIcon from '@material-ui/icons/Forward';
import EditIcon from '@material-ui/icons/Edit';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PropTypes from 'prop-types';

const TrackerTimelineEventTypeAvatar = ({ eventType }) => {
  switch (eventType) {
    case 'move':
      return <ForwardIcon />;
    case 'edit':
      return <EditIcon />;
    case 'callout':
      return <FeedbackIcon />;
    default:
      return <ForwardIcon />;
  }
};
TrackerTimelineEventTypeAvatar.propTypes = {
  eventType: PropTypes.string
};

export default TrackerTimelineEventTypeAvatar;
