import React from 'react';
import ListItem from './ListItem.jsx';
import {GridList, GridTile} from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    height: 950,
    overflowY: 'auto',
  },
};

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const stuff = this.props.images.map((img, i) => 
      <ListItem key={img.id} img={img} updateStar = {this.props.updateStar}/>
    );
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
        {stuff}
        </GridList>
      </div>
    )


  }
}

export default List;
      // <div>
      //   <h4> List Component </h4>
      //   There are { this.props.images.length } images.
      //   {stuff}
      // </div> 