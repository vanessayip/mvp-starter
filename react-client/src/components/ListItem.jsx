import React from 'react';

const ListItem = (props) => (
  <div>
  <h4>Inside listItem component</h4>
  <p>{props.item.name} { props.item.description }</p>
  </div>
)

export default ListItem;