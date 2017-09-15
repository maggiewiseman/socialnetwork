import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';
import { getOnlineUsers } from './actions';


let socket;


export function Socket(dispatch ) {
    if(!socket) {
        socket = io.connect();
        socket.on('connect', function(){
            console.log('socket id', socket.id);
            
            dispatch(getOnlineUsers(socket.id));


            socket.on('welcome', function(data) {
                console.log(data);
            });
        });
    }

    return socket;
}
