import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import { getOnlineUsers, updateOnlineUsers, addMessage, getMessages } from './actions';


let socket;


export function Socket( dispatch ) {
    if(!socket) {
        socket = io.connect();
        socket.on('connect', function(){

            dispatch(getOnlineUsers(socket.id));

            socket.on('userConnected', function(data) {
                dispatch(updateOnlineUsers(data));
            });

            socket.on('disconnectedUser', function(data) {
                dispatch(updateOnlineUsers(data));
            });

            socket.on('incomingMessage', function(data) {
                dispatch(addMessage(data));
            });

            socket.on('chatMessages', function(data) {
                dispatch(getMessages(data));
            });
        });
    }

    return socket;
}
