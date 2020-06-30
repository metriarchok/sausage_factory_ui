import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Typography, CardHeader, Card, makeStyles, Avatar, Grid, Chip, Tooltip } from '@material-ui/core';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import PanToolIcon from '@material-ui/icons/PanTool';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';

const useStyles = makeStyles(theme => ({
  voteCard: {
    width: '93%',
    display: 'inline-block',
    verticalAlign: 'top',
    overflow: 'visible'
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
  avatar: { fontSize: 'small', fontWeight: 'bold', backgroundColor: theme.palette.info.main },
  summaryTextWrapper: {
    width: '100%'
  },
  voteChip: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    '& svg': {
      fontSize: 'medium'
    }
  },
  voteCardHeader: {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '5px',
    height: '36px'
  },
  voteChipWrapper: {
    textAlign: 'left',
    marginBottom: '-20px'
  },
  voteDesc: {
    fontSize: 'small'
  },
  badge: {
    '& .MuiBadge-badge': {
      left: '20px',
      top: '25px'
    }
  }
}));

const VoteResult = ({ vote }) => {
  const classes = useStyles();
  return (
    <Card key={`vote_${vote.roll_call_id}`} className={classes.voteCard} variant="outlined">
      <CardHeader
        className={classes.voteCardHeader}
        avatar={
          vote.passed && vote.passed === 1 ? (
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              className={classes.badge}
              badgeContent="Passed"
              color="primary"
            >
              <Avatar size="small" className={classes.avatar} variant="square">
                Vote
              </Avatar>
            </Badge>
          ) : (
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              className={classes.badge}
              badgeContent="Failed"
              color="error"
            >
              <Avatar variant="square">Vote</Avatar>
            </Badge>
          )
        }
        title={
          <Grid container style={{ width: '100%' }}>
            <Grid item xs={12}>
              <Typography variant="caption" className={classes.voteDesc}>
                {vote.desc}
              </Typography>
            </Grid>
          </Grid>
        }
        subheader={
          <Grid container alignItems="center" className={classes.subhead}>
            <Grid className={classes.voteChipWrapper} item xs={12}>
              <Tooltip title={`'Yea' votes: ${vote.yea}`} aria-label="yea votes">
                <Chip
                  className={classes.voteChip}
                  size="small"
                  avatar={
                    <Avatar>
                      <ThumbUpIcon />
                    </Avatar>
                  }
                  label={vote.yea}
                  variant="outlined"
                />
              </Tooltip>

              <Tooltip title={`'Nay' votes: ${vote.nay}`} aria-label="nay votes">
                <Chip
                  className={classes.voteChip}
                  size="small"
                  avatar={
                    <Avatar>
                      <ThumbDownIcon />
                    </Avatar>
                  }
                  label={vote.nay}
                  variant="outlined"
                />
              </Tooltip>
              <Tooltip title={`'No Vote' votes: ${vote.nv}`} aria-label="nv votes">
                <Chip
                  className={classes.voteChip}
                  size="small"
                  avatar={
                    <Avatar>
                      <PanToolIcon />
                    </Avatar>
                  }
                  label={vote.nv}
                  variant="outlined"
                />
              </Tooltip>
              <Tooltip title={`Absent votes: ${vote.nv}`} aria-label="nv votes">
                <Chip
                  className={classes.voteChip}
                  size="small"
                  avatar={
                    <Avatar>
                      <GolfCourseIcon />
                    </Avatar>
                  }
                  label={vote.absent}
                  variant="outlined"
                />
              </Tooltip>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
};
VoteResult.propTypes = {
  vote: PropTypes.object
};

export default VoteResult;
