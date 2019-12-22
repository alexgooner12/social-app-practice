import React from 'react';
import './App.css';
import UserList from './components/UserList';
import User from './components/User';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navigation from './components/navigation';
import data from './data/data.json';

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<Switch>
					<Route exact path="/" component={() => <UserList userList={data} /> } />
					{ data.map(user => <Route key={user.id} path={`/user/${user.id}`} component={() => <User user={user} userList={data} />} /> )} )}
					<Route component={() => <h2>Error 404 <br/> Content not found</h2>} />
				</Switch>
			</div>
		</Router>

	);
}

export default App;
