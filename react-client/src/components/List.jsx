import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const stuff = this.props.items.map((item, i) => 
      <ListItem key={i} item={item}/>
    );
    return (
      <div>
        <h4> List Component </h4>
        There are { this.props.items.length } items.
        {stuff}
      </div> 
    )
  }
}

export default List;