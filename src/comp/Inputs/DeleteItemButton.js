const DeleteItemButton = props => {
  const { record, removeTimelineItem } = props;
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const approve = () =>
    dataProvider
      .delete('bill_tracker_timeline', { id: record.id, previousData: { record } })
      .then(response => {
        removeTimelineItem(record.order);

        notify('Item Deleted');
      })
      .catch(error => {
        // failure side effects go here
        notify(`Comment approval error: ${error.message}`, 'warning');
      });

  return (
    <Button label="Delete" onClick={approve}>
      <DeleteIcon />
    </Button>
  );
};
DeleteItemButton.propTypes = {
  record: PropTypes.object,
  removeTimelineItem: PropTypes.func
};
