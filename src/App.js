import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import routes from './routes'
import Nav from './Components/Nav/Nav'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      username: 'Test Username',
      password: 'Test Password',
      title: 'New Test Title',
      img: 'New Test image',
      content: 'New Test content',
    }
  }

  async registerUser(){
    const {username, password} = this.state;
    const test = await axios.post('/api/auth/register', {username, password});
  }

  async loginUser(){
    const {username, password} = this.state;
    const test = await axios.post('/api/auth/login', {username, password});
  }

  async createPost(){
    const {title, img, content} = this.state;
    const test = await axios.post('/api/post', {title, img, content})
  }

  render(){
    return (
      <div className='App'>
        <Nav/>
        {routes}
      </div>
    )
  }


};

export default App;
