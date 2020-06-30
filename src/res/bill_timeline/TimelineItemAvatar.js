import React from 'react';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import EventIcon from '@material-ui/icons/Event';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import PropTypes from 'prop-types';
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

export default TimelineItemAvatar;
