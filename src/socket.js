import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import { getOnlineUsers, updateOnlineUsers } from './actions';


let socket;


export function Socket( dispatch ) {
    if(!socket) {
        socket = io.connect();
        socket.on('connect', function(){
            console.log('socket id', socket.id);

            dispatch(getOnlineUsers(socket.id));


            socket.on('welcome', function(data) {
                console.log(data);
            });

            socket.on('userConnected', function(data) {
                console.log('user connected event');
                dispatch(updateOnlineUsers(data));
            });

            socket.on('disconnectedUser', function(data) {
                dispatch(updateOnlineUsers(data));
            });
        });
    }

    return socket;
}
