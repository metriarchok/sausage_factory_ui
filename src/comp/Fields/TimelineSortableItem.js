const DragHandle = sortableHandle(() => <DragHandleIcon />);

const TimelineSortableItem = sortableElement(({ item, parentCallback }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(`exp-${item.id}`);
  const [timelineItem, setTimelineItem] = useState(item);
  const [newTimelineItem, setNewTimelineItem] = useState(null);

  const handleExpand = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleStepDelete = stepToDelete => () => {
    const newSteps = [...timelineItem.timelineSteps.filter(step => step.key !== stepToDelete.key)];
    setTimelineItem(prevState => {
      return { ...prevState, timelineSteps: newSteps };
    });
  };

  const SelectOptions = () => {
    const { data, loading, error } = useQuery({
      type: 'getList',
      resource: 'flow/Oklahoma/points',
      payload: {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
        filter: null
      }
    });
    if (loading) return <Loading />;
    if (error) return <Error />;
    if (!data) return null;
    return data.map(p => {
      return <option value={p.id}>{p.display_name}</option>;
    });
  };

  return (
    <ListItem id={`item-${item.id}`} key={`item-${item.id}`} alignItems="flex-start">
      <div className={classes.root}>
        <ExpansionPanel
          id={`exp-${timelineItem.id}`}
          square
          expanded={expanded === `exp-${timelineItem.id}`}
          defaultExpanded={false}
          onChange={handleExpand(`exp-${timelineItem.id}`)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`exp-${timelineItem.id}-content`}
            id={`exp-${timelineItem.id}-header`}
          >
            <div className={classes.handle}>
              <DragHandle />
            </div>
            <div className={classes.column}>
              <Avatar className={classes.itemAvatar}>?</Avatar>
              <Typography className={classes.heading}>{timelineItem.title}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Progress Steps: {0}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Comments: {0}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails id={`exp-${timelineItem.id}-content`} className={classes.details}>
            <div className={classes.column}>
              <Typography>{JSON.stringify(timelineItem.data, null, 2)}</Typography>
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              {timelineItem.timelineSteps.map(s => {
                return <Chip key={`chip-${s}`} onDelete={handleStepDelete(s)} label={s} />;
              })}
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                Comments
                <br />
                <a href="#add-comment" className={classes.link}>
                  Add Comment
                </a>
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <div className={classes.column} />
            <div className={classes.column}>
              <FormControl className={(classes.formControl, classes.nextStepSelect)} id={`select-control-${item.id}`}>
                <InputLabel htmlFor={`grouped-native-select-${item.id}`}>Next Step</InputLabel>
                <Select
                  native
                  input={
                    <Input
                      onChange={e => {
                        console.log(e.target);
                        setNewTimelineItem(e.target.value);
                      }}
                      id={`grouped-native-select-${item.id}`}
                    />
                  }
                >
                  <SelectOptions />
                </Select>
                <Button
                  onClick={() => {
                    const ns = [...newTimelineItem];
                    if (ns !== null) {
                      var newSteps = [...timelineItem.timelineSteps];

                      newSteps.push(ns);
                      console.log(newSteps);
                      setTimelineItem(prevState => {
                        return {
                          ...prevState,
                          timelineSteps: newSteps
                        };
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </FormControl>
            </div>
            <div className={classes.column}>
              <Button size="small" color="primary">
                Save
              </Button>
            </div>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    </ListItem>
  );
});
