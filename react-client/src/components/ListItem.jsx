import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarFilled from 'material-ui/svg-icons/action/grade';
import ToggleIcon from 'material-ui-toggle-icon';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      images: []
    }
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }
}
 
<IconButton
  onClick={() => setState({ on: !state.on })}
>
  <ToggleIcon
    on={state.on}
    onIcon={<StarFilled />}
    offIcon={<StarBorder/>}
  />
</IconButton>

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