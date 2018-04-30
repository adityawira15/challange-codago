import React, { Component } from 'react'
import './chat.css'
import request from 'superagent'
import socketIOClieant from 'socket.io-client'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            colors: ['bg-success', 'bg-danger', 'bg-primary', 'bg-warning', 'bg-info', 'bg-default'],
        }
        this.yourName = this.yourName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.textArea = this.textArea.bind(this)
    }

    yourName(name) {
        this.setState({ name: name.target.value })
    }

    textArea(message) {
        this.setState({ message: message.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        var socket = socketIOClieant('http://localhost:3000');
        socket.emit('chat name', this.state.name);
        socket.emit('chat message', this.state.message);
        socket.emit('color chat', this.state.colors[Math.floor(Math.random() * 6)]);
        // request
        //     .post('http://localhost:3000/test')
        //     .set('Content-Type', 'application/x-www-form-urlencoded')
        //     .send({ name: this.state.name, message: this.state.message })
        //     .end(function (err, res) {
        //         console.log(res)
        //     });
    }


    render() {
        return (
            <div>
                {/* <h5>{this.state.messages}</h5> */}
                <ul id="message"></ul>
                <form onSubmit={this.onSubmit}>
                    <input id="name" autoComplete="off" placeholder="Your Name" onChange={this.yourName} value={this.state.name} />
                    <textarea id="m" autoComplete="off" rows="5" placeholder="Write your chat here.." onChange={this.textArea} value={this.state.message} />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

export default Chat;