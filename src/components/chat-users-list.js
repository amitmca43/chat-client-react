import React, { Component } from 'react';

class ChatUsers extends Component {
    render () {  
        return (
            <div className="users-list">
                <ul>
                <h3>Your Contacts</h3>
                    {this.props.users.map(user => {
                        const active = user.userName === this.props.activeUser ? 'active' : '';
                        return (
                            <li key={user.userName} className={"room " + active}>
                                <a
                                    onClick={() => this.props.setActiveUser(user.userName)}
                                    href="#">
                                    # {user.nickName}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ChatUsers;