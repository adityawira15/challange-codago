import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './chat.js'
import socketIOClient from 'socket.io-client'
import Remarkable from 'remarkable'

class App extends Component {
  constructor() {
    super()

    this.state = {
      name: [],
      message: [],
      colors: []
    }
    this.textDelete = this.textDelete.bind(this)
  }

  componentDidMount() {
    var socket = socketIOClient('http://192.168.1.11:3000')
    var self = this

    socket.on('chat name', function (name) {
      self.setState({ name: [...self.state.name, name] })
    })

    socket.on('chat message', function (message) {
      self.setState({ message: [...self.state.message, message] })
    })

    socket.on('color chat', function (color) {
      self.setState({ colors: [...self.state.colors, color] })
    })
  }

  getRawMarkup(msg) {
    const md = new Remarkable();
    return { __html: md.render(msg) };
  }

  textDelete(data){
    console.log(data)
    this.setState({
      name: this.state.name.filter((_, i) => i !== data),
      message: this.state.message.filter((_, i) => i !== data),
      colors: this.state.colors.filter((_, i) => i !== data),
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React Chat</h1>
          </header>
        </div>
        <div className="container">
          <div className="row">
            <div className="timeline-centered">
              {this.state.message.map((val, index) => (
                <div>
                  <article className="timeline-entry">
                    <div className="timeline-entry-inner">
                      <a onClick={() => this.textDelete(index)} className={"timeline-icon " + this.state.colors[index]}>
                        <i className="entypo-feather">-</i>
                      </a>
                      <div className="timeline-label">
                        <h2><a>{this.state.name[index]}</a> <span>posted a status update</span></h2>
                        <p dangerouslySetInnerHTML={this.getRawMarkup(val)}>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Chat color={this.state.colors}/>
        </div>
      </div>
    );
  }
}

export default App;
