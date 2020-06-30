import React from 'react';
import { DateField, NumberField, TextField, Show, SimpleShowLayout } from 'react-admin';
import { Card, CardHeader, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import TimelineItemAvatar from './TimelineItemAvatar';

const useStyles = makeStyles(theme => ({
  card: {
    width: '93%',
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top',
    borderLeft: '24px solid #ccc!important',
    borderColor: '#2196F3!important'
  },
  subhead: {
    width: 'fit-content'
  },
  subheadItem: {
    marginRight: '10px'
  },
  avatar: {
    backgroundColor: '#ff0000'
  },
  cardWrapper: {
    minWidth: '500px',
    marginTop: '-36px'
  }
}));
const BillTimelineShow = props => {
  const classes = useStyles();
  return (
    <Show {...props}>
      <SimpleShowLayout {...props}>
        <Card key={tlRecord.id} className={classes.card}>
          <CardHeader
            title={<TextField source="title" />}
            subheader={
              <Grid container alignItems="center" className={classes.subhead}>
                <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                  Order:&nbsp;
                  <NumberField source="eventIndex" />
                </Typography>
                <Divider orientation="vertical" />
                <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                  Date:&nbsp;
                  <DateField source="date" />
                </Typography>
                <Typography className={classes.subheadItem} variant="caption" display="block" gutterBottom>
                  Type:&nbsp;
                  <TextField source="eventType" />
                </Typography>
              </Grid>
            }
            avatar={<TimelineItemAvatar eventType={tlRecord.eventType} />}
          />
        </Card>
      </SimpleShowLayout>
    </Show>
  );
};

export default BillTimelineShow;
