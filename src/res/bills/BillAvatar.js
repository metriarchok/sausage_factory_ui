import React from 'react';
import { useQueryWithStore, LoadingIndicator, Error } from 'react-admin';
import { Avatar, Badge, Typography, Tooltip, makeStyles, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderColor: theme.palette.common.white,
    borderStyle: 'solid',
    borderWidth: '2px',
    background: `linear-gradient(45deg, #A8004C 30%, #992255 90%)`
  },
  billNo: {
    fontWeight: 'bold',
    fontSize: 'small',
    color: theme.palette.common.white
  },
  badge: {
    '& .MuiBadge-badge': {
      '& svg': {
        fontSize: 'small'
      }
    }
  }
}));

const BadgeEventIcon = ({ badgeEvent }) => {
  switch (badgeEvent) {
    case 'Move':
      return <ArrowForwardIcon fontSize="small" />;
    case 'Edit':
      return <EditIcon fontSize="small" />;
    case 'Callout':
      return <AnnouncementIcon fontSize="small" />;
    default:
      return <ContactSupportIcon fontSize="small" />;
  }
};
BadgeEventIcon.propTypes = {
  badgeEvent: PropTypes.string
};
const BillAvatar = ({ id, badgeEvent }) => {
  const classes = useStyles();
  const { data, loading, error } = useQueryWithStore({
    type: 'getOne',
    resource: 'bills',
    payload: { id: id }
  });

  if (loading) return <LoadingIndicator />;
  if (error) return null;
  if (!data) return null;
  return (
    <span>
      {badgeEvent ? (
        <Badge className={classes.badge} badgeContent={<BadgeEventIcon badgeEvent={badgeEvent} />} color="error">
          <Tooltip title={data.title} aria-label="title">
            <Avatar className={classes.avatar}>
              <IconButton className={classes.iconButton}>
                <Typography className={classes.billNo} variant="body1">
                  {data.bill_number}
                </Typography>
              </IconButton>
            </Avatar>
          </Tooltip>
        </Badge>
      ) : (
        <Tooltip title={data.title} aria-label="title">
          <Avatar className={classes.avatar}>
            <Typography className={classes.billNo} variant="body1">
              {data.bill_number}
            </Typography>
          </Avatar>
        </Tooltip>
      )}
    </span>
  );
};

BillAvatar.propTypes = {
  id: PropTypes.string,
  badgeEvent: PropTypes.string
};

export default BillAvatar;
