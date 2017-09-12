import React from 'react';

export default function User({ user }) {
    return (
        <div className="user">
            <img src={user.image} />
            <div className="buttons">
                {!user.hot && <button>Hot</button>}
                {(user.hot || user.hot == null) && <button>Not</button>}
            </div>
        </div>
    );
}
