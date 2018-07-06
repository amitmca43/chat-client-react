import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import SendMessage from './send-message';
import ChatUsersList from './chat-users-list';
import ChatGroups from './chat-groups';
import ChatMessageList from './chat-message-list';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            displayMessages: [],
            users: [],
            activeUser: '',
            hubConnection: null,
        };
    }

    componentWillMount = () => {
        const nick = window.prompt('Your name:', 'John');

        const hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44393/chatHub").build();

        this.setState({ hubConnection, nick });

        hubConnection
            .start()
            .then(() => {
                this.state.hubConnection
                    .invoke('Register', this.state.nick)
                    .catch(err => console.error(err));
                this.setState({ message: '' });
                console.log('Connection started!')
            })
            .catch(err => console.log('Error while establishing connection :('));

        hubConnection.on('ReceiveUserMessage', (nick, receivedMessage) => {
            const message = {
                userName: nick,
                text: receivedMessage
            };

            const messages = this.state.messages.concat([message]);

            const displayMessages = messages.filter((message) => message.userName === this.state.activeUser || message.to === this.state.activeUser);
       
            this.setState({ 
                messages,        
                displayMessages        
            });
            
            console.log(receivedMessage);
            console.log(messages);
        });

        hubConnection.on('ActiveUsers', (users) => {
            console.log(users);           
            this.setState({ users });
        });

        hubConnection.on('UserConnected', (user) => {
            console.log(user);
            const users = this.state.users.concat([user]);           
            this.setState({ users });
        });

        hubConnection.on('UserDisconnected', (username) => {
            console.log(username);
            const users = this.state.users.filter(user => user.userName !== username);           
            this.setState({ users });
        });
    };

    componentDidMount = () => {
        this.state.hubConnection
            .invoke('Register', this.state.nick)
            .catch(err => console.error(err));
        this.setState({ message: '' });
    }

    sendMessage = (message) => {
        this.state.hubConnection
            .invoke('SendUserMessage', this.state.nick, this.state.activeUser, message)
            .catch(err => console.error(err));
      
        const sentMessage = {
            userName: this.state.nick,
            to: this.state.activeUser,
            text: message
        };

        const messages = this.state.messages.concat([sentMessage]);      

        const displayMessages = messages.filter((message) => message.userName === this.state.activeUser || message.to === this.state.activeUser);
       
        this.setState({   
            message: '', 
            messages,        
            displayMessages        
        });
        console.log("Sent Message");
        console.log(messages);
    };

    setActiveUser = (username) => {
        console.log(username);
        const displayMessages = this.state.messages.filter((message) => message.userName === username || message.to === username);
        this.setState({ 
            activeUser: username,
            displayMessages: displayMessages        
        });

        console.log("Set Active User");
        console.log(this.state.displayMessages);
        console.log(this.state.activeUser);       
    }

    render() {
        return (
            <div className="app">
                <ChatUsersList
                    users={this.state.users}
                    activeUser={this.state.activeUser}                   
                    setActiveUser={(username) => this.setActiveUser(username)} />
                <ChatGroups />
                <ChatMessageList messages={this.state.displayMessages} />
                <SendMessage sendMessage={(message) => this.sendMessage(message)} />
            </div>
        );
    }
}

export default Chat;
