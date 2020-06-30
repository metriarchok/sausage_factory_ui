import React from 'react';
import { sortableElement } from 'react-sortable-hoc';

const TimelineSortableField = sortableElement(props => {
  console.log(props);
  return (
    <li>
      <p>Hello!</p>
    </li>
  );
});

export default TimelineSortableField;
