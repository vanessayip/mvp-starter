import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SearchBar from 'material-ui-search-bar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import StarFilled from 'material-ui/svg-icons/action/grade';
import Home from 'material-ui/svg-icons/action/home';
import $ from 'jquery';
import List from './components/List.jsx';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      images: [],
      starredImages: []
    }
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateStar = this.updateStar.bind(this);
  }
  
  search(e) {
    console.log('inside search, value is: ', this.state.value);
    $.ajax({
      url:'/images',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({searchTerm: this.state.value})
    })
    .done((results) => {
      console.log('inside done of search ajax: ', results);
      this.setState({images: results, value: ''});
    })
    .fail((err) => {
      console.log('inside fail of search ajax: ', err);
    });
  }

  onChange(e) {
    this.setState({
      value: e
    });
    //don't need this way anymore if using materialui
    // this.setState({
    //   value: e.target.value
    // });
  }
  
  updateStar(img) {
    console.log('inside updateStar, old star is: ', img.starred);
    $.ajax({
      url:'/starred',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({toogleStar: !img.starred, id: img.id})
    })
    .done((result) => {
      console.log('inside done of updateStar *********: ', result);
      let newImages = this.state.images.slice();
      let newStarredImages = this.state.starredImages.slice();
      newImages.forEach((image) => {
        if (image.id === img.id) {
          image.starred = !img.starred;
          // console.log(image)
        }
      });

      if (result.starred) {// if result.starred is true, add to newStarred
        newStarredImages.push(result)
      } else { //result.starred is false, meaning we want to remove it
        newStarredImages = newStarredImages.filter( (image) => {
          return image.id !== result.id;
        });
      }
      
      this.setState({
        images: newImages,
        starredImages: newStarredImages,
      });
    })
    .fail((err) => {
      console.log('inside fail of updateStar ajax: ', err);
    });    
  }


  componentDidMount() {
    $.ajax({
      url: '/images'
    })
    .done((results) => {
      console.log('inside success componentDidMount for fetching images: ', results);
      this.setState({images: results});
      $.ajax({
        url: '/starred'
      })
      .done((results) => {
        console.log('inside success componentDidMount for fetching starred: ', results);
        this.setState({starredImages: results});
      })
      .fail((err) => {
        console.log('inside fail of componentDidMount for searching starred: ', err);
      });
    })
    .fail((err) => {
      console.log('inside fail of componentDidMount: ', err);
    });

  }
  
  render () {
    // let starredImgs = this.state.images.filter(img => {
    //     return img.starred;
    //   });
    return (
      <MuiThemeProvider>
        <div>
        <h1>Bucket List</h1>
        <Tabs>
          <Tab icon = { 
            <Home />
            } >
            <div>
              <SearchBar
                value = {this.state.value}
                onChange = {this.onChange}
                onRequestSearch = {this.search}
                hintText = 'eg. parks in Toronto'
                style = {{
                  margin: '0 auto',
                  maxWidth: 700
                }}
              />
              <br></br>
              <List 
                images = {this.state.images}
                updateStar = {this.updateStar}
              />

            </div>
          </Tab>
          <Tab icon = {
            <StarFilled /> 
          }>
            <div>
            <List 
              images={this.state.starredImages} 
              updateStar = {this.updateStar}
            />
            </div>
          </Tab>
        </Tabs>

      </div>
    </MuiThemeProvider>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));