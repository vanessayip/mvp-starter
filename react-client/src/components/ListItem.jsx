import React from 'react';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarFilled from 'material-ui/svg-icons/action/grade';
import ToggleIcon from 'material-ui-toggle-icon';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarred: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    //set state is async, so if waiting for the setstate to finish, put logic in component did update
    this.setState({
      isStarred: !this.state.isStarred
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isStarred !== prevState.isStarred) { 
      console.log('inside click after starred changed to: ', this.state.isStarred, this.props.img.id);
      this.props.updateStar(this.state.isStarred, this.props.img.id);
    }
  }
  render () {
    return (
      <GridTile
        title = {this.props.img.caption}
        actionIcon = {
          <IconButton
            onClick = {this.onClick}
          >
            <ToggleIcon
              on = {this.state.isStarred}
              onIcon = { <StarFilled fill="white" /> }
              offIcon = { <StarBorder color="white"/> }
            />
          </IconButton>
        }
      >
        <img src = { this.props.img.thumbnail } />
      </GridTile>

    )
  }
}
export default ListItem;
    // subtitle={<span>by <b>{props.img.author}</b></span>}
  // <div>
  // <h4>Inside listItem component</h4>
  // <p> id: {props.img.id} </p>
  // <p> <img src={ props.img.thumbnail }></img></p>
  // </div>
    // <GridTile
    //   title={props.img.caption}
    //   actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
    // >
    //   <img src={props.img.thumbnail} />
    // </GridTile>