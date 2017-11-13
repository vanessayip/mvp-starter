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
  }

  render () {
    return (
      <GridTile
        title = {this.props.img.caption}
        actionIcon = {
          <IconButton
            //binding or anon fn, so updatestar won't get called until onclick happens
            onClick = {this.props.updateStar.bind(null, this.props.img)}
          >
            <ToggleIcon
              on = {this.props.img.starred}
              color={'white'}
              onIcon = { <StarFilled /> }
              offIcon = { <StarBorder /> }
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