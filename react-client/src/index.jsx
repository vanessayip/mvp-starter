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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  handleSubmit() {
    
  }
  search() {
    
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <input type='text' value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));