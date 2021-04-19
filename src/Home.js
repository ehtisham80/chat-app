import React, { useState, useEffect } from 'react';
import app from './base';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Home = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        app.database().ref(`users`)
            .on('value', (users) => {
                let usersArray = []
                users.forEach((user) => {
                    console.log('EACH USER -- ', user.val())
                    usersArray.push(user.val())
                })
                console.log(usersArray)
                setUsers(usersArray)
            })
        console.log(users)
    }, [])
    let history = useHistory()
    return (
        <Router>
            <div className="container">
                <h1 style={{
                    textAlign: 'center'
                }}>Chat Users</h1>
                {users.map(user => {
                    return (
                        <div className="media border p-3">
                            <img src="/user.png" alt="John Doe"
                                className="mr-3 mt-3 rounded-circle" width="64" />
                            <div className="media-body">
                                <h4>{user.email}</h4>
                                <button
                                    onClick={() => {
                                        history.push(`/chat/${user.id}`)
                                    }}
                                    className="btn btn-info"
                                    type="button"> Chat</button>
                            </div>
                        </div>
                    )
                })}
                <br />
                <button className="btn btn-danger" onClick={() => app.auth().signOut()}>Logout</button>
            </div>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
            </Switch>
        </Router>
    )
}
export default Home;