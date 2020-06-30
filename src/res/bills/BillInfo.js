import React from 'react';
import PropTypes from 'prop-types';
import { Typography, CardHeader, Card, makeStyles, Avatar, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  billInfoCard: {
    width: '93%',
    display: 'inline-block',
    verticalAlign: 'top',
    overflow: 'visible',
    maxWidth: '400px'
  },
  subhead: {
    width: '100%',
    textAlign: 'center'
  },
  subheadItem: {
    marginRight: '12px'
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
  avatar: { fontSize: 'small', fontWeight: 'bold', backgroundColor: theme.palette.info.light },
  summaryTextWrapper: {
    width: '100%'
  },
  billInfoChip: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
    '& svg': {
      fontSize: 'small',
      color: theme.palette.common.white
    },
    '& span': {
      color: theme.palette.common.white,
      fontSize: 'small'
    }
  },
  billInfoCardHeader: {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    height: '36px'
  },
  billInfoChipWrapper: {
    textAlign: 'right',
    marginTop: '-10px'
  },
  billInfoDesc: {
    fontSize: 'small'
  }
}));

const BillInfo = ({ billInfo }) => {
  const classes = useStyles();
  return (
    <Card key={`billInfo_${billInfo.id}`} className={classes.billInfoCard} variant="outlined">
      <CardHeader
        className={classes.billInfoCardHeader}
        avatar={
          <Avatar size="small" className={classes.avatar} variant="square">
            Info
          </Avatar>
        }
        title={
          <Grid container style={{ width: '100%' }}>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.billInfoDesc}>
                {`${billInfo.eventType}: ${billInfo.title}`}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
BillInfo.propTypes = {
  billInfo: PropTypes.object
};

export default BillInfo;
