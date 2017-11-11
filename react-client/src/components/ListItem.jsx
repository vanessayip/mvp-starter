import React from 'react';

const ListItem = (props) => (
  <div>
  <h4>Inside listItem component</h4>
  <p> id: {props.img.id} </p>
  <p> url: { props.img.thumbnail }</p>
  </div>
)

export default ListItem;