import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const stuff = this.props.images.map((img, i) => 
      <ListItem key={i} img={img}/>
    );
    return (
      <div>
        <h4> List Component </h4>
        There are { this.props.images.length } images.
        {stuff}
      </div> 
    )
  }
}

export default List;