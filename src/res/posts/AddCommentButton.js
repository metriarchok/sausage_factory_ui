import React from 'react';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-admin';
import PropTypes from 'prop-types';

const styles = {
  button: {
    marginTop: '1em'
  }
};

const AddCommentButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="raised"
    component={Link}
    to={`/comments/create?post_id=${record.id}`}
    label="Add a comment"
    title="Add a comment"
  >
    <ChatBubbleIcon />
  </Button>
);

AddCommentButton.propTypes = {
  classes: {
    button: PropTypes.object
  },
  record: {
    id: PropTypes.string
  }
};

export default withStyles(styles)(AddCommentButton);
