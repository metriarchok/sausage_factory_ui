import React from 'react';
import { Box, Card, CardContent, CardHeader, Typography, makeStyles, Grid, Paper } from '@material-ui/core';

import { CardActions, LoadingIndicator, Error, useQueryWithStore } from 'react-admin';

import PropTypes from 'prop-types';

import BillAvatar from '../bills/BillAvatar';

import VoteResult from '../bills/VoteResult';
import BillText from '../bills/BillText';
import BillInfo from '../bills/BillInfo';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '100%',
    overflow: 'visible'
  },
  cardConternt: {
    backgroundColor: theme.palette.background.default,
    borderTopColor: 'lightgray',
    borderTopStyle: 'solid',
    borderTopWidth: 'thin'
  },
  cardHeader: {
    marginBottom: '-36px',
    paddingTop: '0',
    paddingLeft: '0',
    marginLeft: '-12px',
    marginTop: '-12px'
  },
  cardHeaderSubtitle: {
    fontSize: 'x-small'
  },
  titleGrid: {
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '5px'
  },
  subtitleGrid: {
    width: '100%'
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
  titleText: {
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  titleBox: {
    marginLeft: '-16px',
    paddingLeft: '18px',
    paddingBottom: '10px',
    paddingTop: '10px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0 18px 18px 0'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  summaryTextWrapper: {
    width: '100%'
  },
  summaryPaper: {
    marginLeft: '-10px',
    marginRight: '-10px',
    padding: '12px',
    minHeight: '60px'
  },
  triggerReference: {
    marginTop: '10px'
  }
}));

const BillTimelineEvent = ({ eventType, data }) => {
  switch (eventType) {
    case 'vote':
      return <VoteResult vote={data.data} />;
    case 'text':
      return <BillText billText={data.data} />;
    default:
      return <BillInfo billInfo={data} />;
  }
};
BillTimelineEvent.propTypes = {
  eventType: PropTypes.string,
  data: PropTypes.object
};
const BillTimelineReference = ({ id }) => {
  const { data, loading, error } = useQueryWithStore({
    type: 'getOne',
    resource: 'bill_timeline',
    payload: { id: id }
  });
  if (loading) return <LoadingIndicator />;
  if (error) return <Error />;
  if (!data) return null;
  return <BillTimelineEvent eventType={data.eventType} data={data} />;
};
BillTimelineReference.propTypes = {
  id: PropTypes.string
};

const BillTrackerTimelineCard = ({ id, tlRecord, removeTimelineItem, currentTrackerStep, basePath, cardActions }) => {
  const classes = useStyles();
  return (
    <Card key={id} className={classes.card} variant="outlined">
      <CardHeader
        title={
          <Grid className={classes.titleGrid} container xs={12} spacing={1}>
            <Typography className={classes.cardHeaderTitle} variant="body2" component="span">
              {tlRecord.action}
            </Typography>
          </Grid>
        }
        avatar={tlRecord && tlRecord.action && <BillAvatar id={tlRecord.bill_id} badgeEvent={tlRecord.action} />}
        subheader={
          <Grid className={classes.subtitleGrid} container xs={12} spacing={1}>
            <Typography className={classes.cardHeaderSubtitle} variant="body2" component="span">
              {tlRecord.date}
            </Typography>
          </Grid>
        }
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardConternt}>
        <Grid container style={{ width: '100%' }}>
          <Grid item xs={12}>
            <Box className={classes.titleBox} boxShadow={1}>
              <Typography boxShadow={2} className={classes.titleText} variant="h3" component="h3">
                {tlRecord.title}
              </Typography>
            </Box>
          </Grid>
          <Grid style={{ marginBottom: '18px' }} item xs={12}>
            <Grid className={classes.triggerReference} item xs={12}>
              <BillTimelineReference id={tlRecord.trigger_timeline_id} />
            </Grid>
            {tlRecord.ref_timeline_ids && tlRecord.ref_timeline_ids.length > 0 ? (
              <Grid item xs={12}>
                {tlRecord.ref_timeline_ids.map(id => (
                  <BillTimelineReference id={id} />
                ))}
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.summaryPaper}>
              <div className={classes.summaryTextWrapper} dangerouslySetInnerHTML={{ __html: tlRecord.summary_text }} />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions style={{ textAlign: 'right' }}>{cardActions}</CardActions>
    </Card>
  );
};

BillTrackerTimelineCard.propTypes = {
  id: PropTypes.string,
  tlRecord: PropTypes.object,
  basePath: PropTypes.string,
  currentTrackerStep: PropTypes.object,
  removeTimelineItem: PropTypes.func,
  cardActions: PropTypes.node
};

export default BillTrackerTimelineCard;
