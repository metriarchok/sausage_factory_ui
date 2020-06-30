import React from 'react';
import PropTypes from 'prop-types';
import { Select, FormControl, MenuItem, FormHelperText, ListSubheader, Tooltip } from '@material-ui/core';
import { format } from 'date-fns';
import { LoadingIndicator, Error, useQueryWithStore } from 'react-admin';
import TimelineItemAvatar from '../../res/bill_timeline/TimelineItemAvatar';

const SelectTimelineEvent = props => {
  const { pagination, sort, filter, onChange, name, value, helperText } = props;
  console.log(props);
  const { data, loading, error } = useQueryWithStore({
    type: 'getList',
    resource: 'bill_timeline',
    payload: {
      pagination: pagination || { page: 1, perPage: 100 },
      sort: sort || { field: 'date', order: 'DESC' },
      filter: filter || {}
    }
  });
  if (loading) return <LoadingIndicator />;
  if (error) return <Error />;
  if (!data) return null;
  return (
    <FormControl fullWidth>
      <Select labelId={`${name}-label`} fullWidth name={name} value={value} onChange={onChange}>
        {data.map((d, i) => {
          return i === 0 || data[i - 1].date !== d.date
            ? [
                <ListSubheader disableSticky>
                  {' '}
                  {format(new Date(`${d.date} 00:00:00.000Z GMT-0600`), 'MMMM d, yyyy')}{' '}
                </ListSubheader>,
                <MenuItem value={d['id']}>
                  <Tooltip title={JSON.stringify(d.data, null, 2)}>
                    <TimelineItemAvatar eventType={d.eventType} />
                  </Tooltip>
                  {` ${d.eventIndex}. ${d.title}`}
                </MenuItem>
              ]
            : [
                <MenuItem value={d['id']}>
                  <Tooltip title={JSON.stringify(d.data, null, 2)}>
                    <TimelineItemAvatar eventType={d.eventType} />
                  </Tooltip>
                  {` ${d.eventIndex}. ${d.title}`}
                </MenuItem>
              ];
        })}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};
SelectTimelineEvent.propTypes = {
  pagination: PropTypes.object,
  sort: PropTypes.object,
  filter: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  helperText: PropTypes.string
};

export default SelectTimelineEvent;
