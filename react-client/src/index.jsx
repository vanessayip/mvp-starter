import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      items: [{name: 'bob', description: 'says hello world'}]
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
      data: {searchTerm: this.state.value}
    })
    .done((results) => {
      console.log('inside done of search ajax: ', results);
      //set state for images to trigger rerender
    })
    .fail((err) => {
      console.log('inside fail of search ajax: ', err);
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
    // console.log('value was changed: ', this.state.value)
  }
  
  componentDidMount() {
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
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
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));