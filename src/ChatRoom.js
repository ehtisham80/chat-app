import React, { Component, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import app from './base';
import { SenderMessages } from './SendMessages';
import { ReceiverMessages } from './SendMessageByReceiver';
import moment from 'moment';
import ReactScrollableFeed from 'react-scrollable-feed';

const ChatRoom = () => {
    let location = useLocation()
    let history = useHistory()
    let userId = location.pathname.substring(6)
    let currentUserID = app.auth().currentUser.uid
    const [msgValue, setMsgValue] = useState('')
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState({
        id: '',
        email: ''
    })
    const sendNewMessage = () => {
        let date = new Date().toString()
        setMsgValue('')
        if (msgValue) {
            SenderMessages(msgValue, currentUserID, userId, date)
                .then(() => {
                    console.log('Message sent by sender successfully!')
                }).catch((e) => console.log(e))
            ReceiverMessages(msgValue, currentUserID, userId, date)
                .then(() => {
                    console.log('Message sent by receiver successfully!')
                }).catch((e) => console.log(e))
        }
    }
    useEffect(() => {
        app.database().ref(`users/${userId}`)
            .on('value', (user) => {
                console.log('CHAT USER IS ', user.val())
                setUser({
                    id: user.val().id,
                    email: user.val().email
                })
            })
        // find messages from firebase database
        app.database().ref(`messages`)
            .child(userId)
            .child(currentUserID)
            .on('value', (msgs) => {
                let msg = []
                msgs.forEach((child) => {
                    console.log('Each Message -- ', child.val())
                    msg.push({
                        sender: child.val().message.sender,
                        receiver: child.val().message.receiver,
                        msg: child.val().message.msg,
                        date: moment(child.val().message.date).startOf('seconds').fromNow()
                    })
                })
                setMessages(msg)
            })
    }, [])
    return (
        <div className="container">
            <h3 style={{
                cursor: "pointer"
            }}
                onClick={() => history.push('/')}>
                <svg
                    xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                    fill="currentColor" class="bi bi-arrow-left-short"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                </svg>
            </h3>
            <div className="media">
                <img src="/user.png" className="mr-3" style={{ width: '64px' }} />
                <div className="media-body">
                    <h5 className="mt-0">{user.email}</h5>
                </div>
            </div>
            <hr />
            <div id="chat" style={{
                overflowY: 'scroll',
                height: '350px',
                padding: 10
            }} >
                <ReactScrollableFeed>
                    {messages.map(message => {
                        if (message.sender === currentUserID) {
                            return (
                                <div>
                                    <p style={{
                                        fontSize: '20px',
                                        textAlign: 'end',
                                        color: '#6495ed'
                                    }}>
                                        {message.msg}
                                    </p>
                                    <p style={{
                                        textAlign: 'end',
                                        color: 'blueviolet'
                                    }}>
                                        <small>{message.date}</small>
                                    </p>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <p style={{
                                        fontSize: '20px',
                                        textAlign: 'left',
                                        color: '#00ced1'
                                    }}>
                                        {message.msg}
                                    </p>
                                    <p style={{
                                        textAlign: 'left',
                                        color: 'blueviolet'
                                    }}>
                                        <small>{message.date}</small>
                                    </p>
                                </div>
                            )
                        }
                    })}
                </ReactScrollableFeed>
            </div>
            <hr />
            <form>
                <div className="form-row">
                    <div className="col">
                        <textarea className="form-control"
                            onChange={(m) => {
                                setMsgValue(m.target.value)
                            }}
                            value={msgValue}
                            placeholder="Type a message ..."
                        ></textarea>
                    </div>
                    <div className="col-2 mr-1">
                        <button onClick={sendNewMessage} type="button" className="btn btn-primary pb-3 pt-3" >Send</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChatRoom;