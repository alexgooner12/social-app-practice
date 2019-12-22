import React, { Component } from 'react';

class User extends Component {
    constructor() {
        super();
        this.state = {
            userList: null,
            directFriends: null,
            showDirectFriends: false,
            friendsOfFriends: null,
            showFriendsOfFriends: false,
            suggestedFriends: null,
            showSuggestedFriends: false
        }
    }

    componentDidMount() {
        this.setState({ userList: this.props.userList }, () => {
            this.getDirectFriends(this.props.user.id);
            this.getFriendsOfFriends(this.props.user.id);
            // this.getSuggestedFriends(this.props.user.id);
        });
    }

    getDirectFriends = () => {
        const currentUser = this.state.userList.find(user => user.id === this.props.user.id);
        const directFriends = this.state.userList.filter(user => currentUser.friends.includes(user.id));
        this.setState({ directFriends });
    }

    showDirectFriends = () => {
        this.setState({ showDirectFriends: !this.state.showDirectFriends });
    }

    getFriendsOfFriends = () => {
        const friendsIds = this.state.userList.find(user => user.id === this.props.user.id).friends;
        const friends = this.state.userList.filter(user => friendsIds.includes(user.id));
        const friendsOfFriendsIds = new Set();
        friends.forEach(element => {
            element.friends.forEach(id => friendsOfFriendsIds.add(id));
        });
        const friendsOfFriendsIdsArr = Array.from(friendsOfFriendsIds);
        const friendsOfFriends = this.state.userList.filter(user => friendsOfFriendsIdsArr.includes(user.id));
        this.setState({ friendsOfFriends });
    }

    showFriendsOfFriends = () => {
        this.setState({ showFriendsOfFriends: !this.state.showFriendsOfFriends });
    }

    // • Suggested friends: people in the group 
    // who know 2 or more direct friends of the chosen user but are not directly connected to the chosen user;

    getSuggestedFriends = () => {
        const friendsIDs = this.state.directFriends.map(directFriend => directFriend.id);
        const strangers = this.state.userList.filter(user => user.id !== this.props.user.id && !this.props.user.friends.includes(user.id));
        const suggestedFriends = [];
        strangers.forEach(stranger => {
            this.populateSuggestedFriends(stranger, suggestedFriends, friendsIDs);
        });
        this.setState({ suggestedFriends });
    }

    populateSuggestedFriends = (stranger, suggestedFriends, friendsIDs) => {
        let numberOfMutualFriends = 0;
        stranger.friends.forEach(strangerFriendId => {
            if (friendsIDs.length >= 2 && stranger.friends.length >= 2 && friendsIDs.includes(strangerFriendId)) {
                numberOfMutualFriends++;
                if (numberOfMutualFriends >= 2) {
                    suggestedFriends.push(stranger);
                }
            }
        })
    }

    showSuggestedFriends = () => {
        this.getSuggestedFriends();
        this.setState({ showSuggestedFriends: !this.state.showSuggestedFriends });
    }

    render() {
        return (
            <section className="my-4">
                <h4>User info: </h4>
                <div>
                    <p>First name: {this.props.user.firstName} </p>
                    <p>Last name: {this.props.user.surname} </p>
                    <p>Gender: {this.props.user.gender} </p>
                    <p>Age: {this.props.user.age} </p>
                </div>
                <div>
                    <div>
                        <label>Direct friends:</label>
                        <button className="btn btn-primary" onClick={() => this.showDirectFriends(this.props.user.id)}>
                            {this.state.showDirectFriends ? 'Hide' : 'Show'}
                        </button>
                        <ul className="list-group">
                            {this.state.showDirectFriends ?
                                this.state.directFriends.map(directFriend =>
                                    <li key={directFriend.id} className="list-group-item">{directFriend.firstName}</li>)
                                : null
                            }
                        </ul>
                    </div>
                    <div>
                        <label>Show suggested friends</label>
                        <button onClick={() => this.showSuggestedFriends(this.props.user.id)} className="btn btn-primary">
                            {this.state.showSuggestedFriends ? 'Hide' : 'Show'}
                        </button>
                        <ul className="list-group">
                            {this.state.showSuggestedFriends ?
                                this.state.suggestedFriends.map(suggestedFriend =>
                                    <li key={suggestedFriend.id} className="list-group-item">{suggestedFriend.firstName}</li>)
                                : null
                            }
                        </ul>
                    </div>
                    <div>
                        <label>Show friends of friends</label>
                        <button onClick={this.showFriendsOfFriends} className="btn btn-primary">
                            {this.state.showFriendsOfFriends ? 'Hide' : 'Show'}
                        </button>
                        <ul className="list-group">
                            {this.state.showFriendsOfFriends ?
                                this.state.friendsOfFriends.map(friend =>
                                    <li key={friend.id} className="list-group-item">{friend.firstName}</li>)
                                : null
                            }
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default User;