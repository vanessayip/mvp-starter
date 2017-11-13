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
    // this.state = {
    //   isStarred: props.img.starred
    // };
    // this.onClickStar = this.onClickStar.bind(this);
  }

  onClickStar() {
    //set state is async, so if waiting for the setstate to finish, put logic in component did update
    this.setState({
      isStarred: !this.state.isStarred
    })
  }
  
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.isStarred !== prevState.isStarred) { 
  //     console.log('inside click after starred changed to: ', this.state.isStarred, this.props.img.id);
  //     this.props.updateStar(this.state.isStarred, this.props.img.id);
  //   }
  // }
  render () {
    let imagesToShow;

    if (this.props.showStarsOnly) {
      imagesToShow = this.props.images.filter(img => {
        return img.starred;
      });
    }

    imagesToShow = imagesToShow || this.props.images;

    imagesToShow = imagesToShow.map((img, i) => 
      <ListItem 
        key={img.id} 
        img={img} 
        updateStar = {this.props.updateStar} 
      />
    );

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
        {imagesToShow}
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