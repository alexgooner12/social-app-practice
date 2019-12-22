import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ userList }) {
    return (
        <div>
            <h1>Welcome to Social app</h1>
            <div>
                <h2>Users:</h2>
                <ul className="list-group">
                    { userList.map(user => <li key={user.id} className="list-group-item">
                        <Link to={`/user/${user.id}`}>{user.firstName}</Link>
                    </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default UserList;