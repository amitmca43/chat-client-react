import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Message from './chat-message';
import OwnerMessage from './chat-owner-message';

class ChatMessageList extends Component {
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
        }
    }
    
    render() {
        
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    if(message.to) {
                        return (
                        <OwnerMessage key={index} username={message.userName} text={message.text}  />
                        )
                    } else {
                        return (                       
                            <Message key={index} username={message.userName} text={message.text}  />
                        )
                    }                    
                })}
            </div>
        )
    }
}

export default ChatMessageList;