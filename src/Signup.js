import React, { Component, useCallback } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import app from './base';

const Signup = ({ history }) => {
    let nav = useHistory()
    const handleSignup = useCallback(
        async event => {
            event.preventDefault()
            const { email, password } = event.target.elements;
            try {
                await app.auth()
                    .createUserWithEmailAndPassword(email.value, password.value)
                // save user data into FIREBASE REALTIME DATABASE
                app.database().ref(`users/${app.auth().currentUser.uid}`)
                    .set({
                        id: app.auth().currentUser.uid,
                        email: email.value
                    })
                history.push("/")
            } catch (error) {
                alert(error)
            }
        }, [history]
    )
    return (
        <div className="container">
            <h1>Sign up</h1>
            <form onSubmit={handleSignup} className="form-group" style={{
                padding: 5
            }}>
                <label style={{
                    padding: 2,
                    margin: 3
                }}>
                    Email
                    <input type="email" name="email" placeholder="Email" className="form-control" />
                </label>
                <label style={{
                    padding: 2,
                    margin: 3
                }}>
                    Password
                    <input type="password" name="password" placeholder="Password" className="form-control" />
                </label>
                <button type="submit" className="btn btn-primary">Register</button>
                <p onClick={() => nav.push('/login')}
                    style={{
                        cursor: 'pointer'
                    }}>Need to Login?</p>
            </form>
        </div>
    )
}

export default withRouter(Signup);