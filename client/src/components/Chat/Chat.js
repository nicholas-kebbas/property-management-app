import React from 'react';
import Users from "./Users";
import Messages from "./Messages";
import EnterChat from "./EnterChat";
import socketIOClient from 'socket.io-client';
/* Higher Order Components */
import requireAuth from '../requireAuth';

/* CSS */
import 'bootstrap';
import "../../index.css";

class Chat extends React.Component {

    constructor(props){
        super(props);
        this.socket = null;
        this.state = {
            username : localStorage.getItem('my_username') ? localStorage.getItem('my_username') : '',
            uid : localStorage.getItem('my_id') ? localStorage.getItem('my_id') : this.generateUID(),
            chat_ready : false,
            users : [],
            messages : [],
            message : ''
        }
    }

    componentDidMount(){
        if(this.state.username.length) {
            this.initChat();
        }
    }

    generateUID(){

    }

    setUsername(username, e){
        this.setState({
            username : username
        }, () => {
            this.initChat();
        });
    }

    sendMessage(message, e){
        console.log(message);
        this.setState({
            messages : this.state.messages.concat([{
               username : localStorage.getItem('username'),
               uid : localStorage.getItem('uid'),
               message : message,
           }])
        });
        this.socket.emit('message', {
            username : localStorage.getItem('username'),
            uid : localStorage.getItem('uid'),
            message : message,
        });
        this.scrollToBottom();
    }

    /* Calculate height of messages */
    scrollToBottom() {
        let messages = document.getElementsByClassName('messages')[0];
        messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    }

    initChat(){
        localStorage.setItem('username', this.state.username);
        this.setState({
            chat_ready : true,
        });
        this.socket = socketIOClient('ws://localhost:8000', {
            query : 'username='+this.state.username+'&uid='+this.state.uid
        });

        this.socket.on('updateUsersList', function (users) {
            console.log(users);
            this.setState({
                users : users
            });
        }.bind(this));

        this.socket.on('message', function (message) {
            this.setState({
                messages : this.state.messages.concat([message])
            });
            this.scrollToBottom();
        }.bind(this));
    }

    render() {
        return (
          <div id="chat_root">
            <h1> Chat </h1>
            <div className="chat">
                {this.state.chat_ready ? (
                    <React.Fragment>
                        <Users users={this.state.users}/>
                        <Messages
                            sendMessage={this.sendMessage.bind(this)}
                            messages={this.state.messages}
                        />
                    </React.Fragment>
                ) : (
                    <EnterChat
                        setUsername={this.setUsername.bind(this)}
                    />
                )}
            </div>
          </div>
        )
    }
}

export default requireAuth(Chat);
