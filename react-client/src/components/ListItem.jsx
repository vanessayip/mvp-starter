import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const ListItem = (props) => (
  <GridTile
    title={props.img.caption}
    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
  >
    <img src={props.img.thumbnail} />
  </GridTile>

)


export default ListItem;
    // subtitle={<span>by <b>{props.img.author}</b></span>}
  // <div>
  // <h4>Inside listItem component</h4>
  // <p> id: {props.img.id} </p>
  // <p> <img src={ props.img.thumbnail }></img></p>
  // </div>