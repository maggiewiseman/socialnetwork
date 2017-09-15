import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';


let socket;


export function Socket() {
    if(!socket) {
        socket = io.connect();
        console.log('in socket');
        socket.on('welcome', function(data) {
            console.log(data);
        });
    }

    return socket;
}
