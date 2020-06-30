import React, { useState } from 'react';
import { sortableContainer } from 'react-sortable-hoc';
import { useQuery, Loading, Error, useMutation, sanitizeEmptyValues, TextInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';

import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  card: {
    width: '100%'
  },
  cardContent: {
    flex: '1 0 auto'
  },
  inline: {
    display: 'inline'
  },
  expRoot: {
    width: '80%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    height: '40px',
    alignContent: 'middle',
    verticalAlign: 'middle',
    paddingTop: '8px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    display: 'flex',
    flexBasis: '33.33%',
    flexWrap: 'wrap'
  },
  flexContent: {
    flex: '1 1 auto'
  },
  handle: {
    marginLeft: '-48px',
    marginTop: '-20px',
    marginRight: '25px',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  itemAvatar: {
    marginRight: '15px'
  },
  nextStepSelect: {
    width: '85%'
  }
}));

// the parent component (Edit or Create) injects these props to their child
const TimelineSortableItem = ({ basePath, record, save, saving, version }) => {
  const submit = values => {
    // React-final-form removes empty values from the form state.
    // To allow users to *delete* values, this must be taken into account
    save(sanitizeEmptyValues(record, values));
  };

  return (
    <Form
      initialValues={record}
      onSubmit={submit}
      mutators={{ ...arrayMutators }} // necessary for ArrayInput
      subscription={defaultSubscription} // don't redraw entire form each time one field changes
      key={version} // support for refresh button
      keepDirtyOnReinitialize
      render={formProps => (
        <form>
          <TextInput source="eventIndex" />
          <TextInput source="description" />
        </form>
      )}
    />
  );
};

const defaultSubscription = {
  submitting: true,
  pristine: true,
  valid: true,
  invalid: true
};

const SaveButton = record => {
  const [mutate, { loading }] = useMutation();
  const save = event => {
    record.record.map(u => {
      console.log('timelineSteps');
      console.log(u['timelineSteps']);
      u['timelineSteps'] = u['timelineSteps'] || [];
      u['people'] = u['people'] || {};
      u['time'] = u['time'] || '';
      u['description'] = u['description'] || '';
      u['chamber'] = u['chamber'] || '';

      mutate({
        type: 'update',
        resource: 'bills/timeline',
        payload: {
          id: u.id,
          data: { ...u }
        }
      });
    });
  };
  return (
    <Button label="Save" onClick={save} disabled={loading}>
      Save
    </Button>
  );
};

const TimelineSortable = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const ReorderElem = data => {
  const [timeline, setTimeline] = useState(data.data);
  const dates = timeline
    .map(d => d.date)
    .filter((val, index, self) => {
      return self.indexOf(val) === index;
    });
  const collectionsVar = dates
    .map((date, index) => {
      return timeline
        .filter(val => {
          return val.date === date;
        })
        .sort((a, b) => {
          return a.eventIndex - b.eventIndex;
        });
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  const [collections, setCollections] = useState(collectionsVar);

  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    const minIndex = Math.min.apply(
      null,
      collections[collection].map(i => i.eventIndex)
    );

    const newCollections = [...collections];
    newCollections[collection] = arrayMove(collections[collection], oldIndex, newIndex);
    setCollections(newCollections);

    const newTimeline = arrayMove(timeline, oldIndex + minIndex, newIndex + minIndex).map((item, index) => {
      return {
        id: item.id,
        eventIndex: index,
        eventType: item.eventType,
        date: item.date,
        time: item.time,
        title: item.title,
        description: item.description,
        chamber: item.chamber,
        data: item.data
      };
    });
    setTimeline(newTimeline);
  };
  const updateCallback = updateItem => {
    console.log('updateCallback');
    console.log(updateItem.id);
    var updatedTimeline = [...timeline].filter(f => f.id !== updateItem.id);
    console.log(updatedTimeline);
    updatedTimeline.push(updateItem);
    setTimeline(updatedTimeline);
  };

  const classes = useStyles();
  return (
    <div>
      <SaveButton record={timeline} />
      <TimelineSortable useDragHandle onSortEnd={onSortEnd}>
        {collections.map((items, index) => {
          return (
            <React.Fragment key={`frag-${index}`}>
              <div>
                <strong>{dates[index]}</strong>
                <List className={classes.root}>
                  {items.map((item, i) => {
                    return (
                      <TimelineSortableItem
                        basePath={'bills/timeline'}
                        key={item.id}
                        version={item.id}
                        record={item}
                        index={i}
                        collection={index}
                        save={updateCallback}
                      />
                    );
                  })}
                </List>
              </div>
            </React.Fragment>
          );
        })}
      </TimelineSortable>
    </div>
  );
};

const TimelineReorder = props => {
  const billId = 117808;
  const { data, loading, error } = useQuery({
    type: 'getManyReference',
    resource: 'bills/timeline',
    payload: {
      target: 'bills/timeline',
      id: billId.toString(),
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'eventIndex', order: 'desc' }
    }
  });
  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;
  else return <ReorderElem data={data} />;
};

export default TimelineReorder;
