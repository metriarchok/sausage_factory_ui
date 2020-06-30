import React from 'react';
import PropTypes from 'prop-types';
import { Typography, CardHeader, Card, makeStyles, Avatar, Grid, Chip, Tooltip } from '@material-ui/core';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles(theme => ({
  billTextCard: {
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
  avatar: { fontSize: 'small', fontWeight: 'bold', backgroundColor: theme.palette.warning.light },
  summaryTextWrapper: {
    width: '100%'
  },
  billTextChip: {
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
  billTextCardHeader: {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    height: '36px'
  },
  billTextChipWrapper: {
    textAlign: 'right',
    marginTop: '-10px'
  },
  billTextDesc: {
    fontSize: 'small'
  }
}));

const BillText = ({ billText }) => {
  const classes = useStyles();
  return (
    <Card key={`billText_${billText.doc_id}`} className={classes.billTextCard} variant="outlined">
      <CardHeader
        className={classes.billTextCardHeader}
        avatar={
          <Avatar size="small" className={classes.avatar} variant="square">
            Text
          </Avatar>
        }
        title={
          <Grid container style={{ width: '100%' }}>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.billTextDesc}>
                {billText.type}
              </Typography>
              <div className={classes.billTextChipWrapper}>
                <Tooltip title="Open bill text on LegiScan website">
                  <Chip
                    size="small"
                    className={classes.billTextChip}
                    clickable
                    onClick={() => window.open(`${billText.url}`, '_blank')}
                    label={
                      <Typography variant="caption">
                        LegiScan <OpenInNewIcon />
                      </Typography>
                    }
                  />
                </Tooltip>
                <Tooltip title="Open bill text on Oklahoma state website">
                  <Chip
                    size="small"
                    className={classes.billTextChip}
                    label={
                      <Typography variant="caption">
                        State <OpenInNewIcon />
                      </Typography>
                    }
                    clickable
                    onClick={() => window.open(`${billText.state_link}`, '_blank')}
                  />
                </Tooltip>
              </div>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
BillText.propTypes = {
  billText: PropTypes.object
};

export default BillText;
