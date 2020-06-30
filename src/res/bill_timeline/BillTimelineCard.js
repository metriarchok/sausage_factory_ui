import React from 'react';
import { Card, Typography, Divider, Grid, CardHeader, makeStyles } from '@material-ui/core';
import { TextField, NumberField, DateField } from 'react-admin';
import TimelineItemAvatar from './TimelineItemAvatar';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  flexInput: {
    marginRight: '30px'
  },
  flexRow: {
    marginBottom: '30px'
  },
  card: {
    width: '100%',
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    borderLeftWidth: '24px!important',
    borderLeftStyle: 'solid!important',
    borderLeftColor: theme.palette.primary.dark
  },
  subhead: {
    width: 'fit-content'
  },
  subheadItem: {
    marginRight: '10px'
  },
  avatar: {
    backgroundColor: '#ff0000'
  }
}));

const BillTimelineCard = props => {
  const { tlRecord } = props;
  const classes = useStyles();
  return (
    <Card key={tlRecord.id} className={classes.card}>
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
              Date:&nbsp;
              <DateField record={tlRecord} source="date" />
            </Typography>
            <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
              Type:&nbsp;
              <TextField record={tlRecord} source="eventType" />
            </Typography>
          </Grid>
        }
        avatar={<TimelineItemAvatar eventType={tlRecord.eventType} />}
      />
    </Card>
  );
};
BillTimelineCard.propTypes = {
  tlRecord: PropTypes.object
};

export default BillTimelineCard;
