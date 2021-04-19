import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import app from './base';
import { AuthContext } from './Auth';

const Login = ({ history }) => {
    let nav = useHistory()
    const handleLogin = useCallback(
        async event => {
            event.preventDefault()
            const { email, password } = event.target.elements;
            try {
                await app.auth()
                    .signInWithEmailAndPassword(email.value, password.value)
                history.push("/")
            } catch (error) {
                alert(error)
            }
        }, [history]
    )
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <div className="container">
            <h1>Log in</h1>
            <form onSubmit={handleLogin} className="form-group">
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
                <button type="submit" className="btn btn-primary">Log in</button>
                <p onClick={() => {
                    nav.push('/signup')
                }}
                    style={{
                        cursor: 'pointer'
                    }}>Need an Account?</p>
            </form>
        </div>
    )
}
export default withRouter(Login);