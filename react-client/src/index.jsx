import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      images: [{id: 12345, thumbnail: 'www.url.com/thumbnail'}]
    }
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  search(e) {
    e.preventDefault(); //need this b/c submit will refresh page
    console.log('inside search, value is: ', this.state.value);
    $.ajax({
      url:'/images',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({searchTerm: this.state.value})
    })
    .done((results) => {
      console.log('inside done of search ajax: ', results);
      this.setState({images: results});
    })
    .fail((err) => {
      console.log('inside fail of search ajax: ', err);
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  
  componentDidMount() {
    $.ajax({
      url: '/images'
    })
    .done((results) => {
      console.log('inside success componentDidMount: ', results);
      this.setState({images: results});
    })
    .fail((err) => {
      console.log('inside fail of componentDidMount: ', err);
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <form onSubmit={this.search}>
        <label>
          Search:
          <input type='text' value={this.state.value} onChange={this.onChange}/>
        </label>
        <button type="submit">Submit</button>
      </form>
      <List images={this.state.images}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));