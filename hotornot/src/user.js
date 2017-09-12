import React from 'react';




export default function User({ user, makeHotFunction, makeNotFunction}) {
    //const makeHot = this.props.dispatch(makeHot(id));
    return (
        <div className="user">
            <img src={user.image} />
            <div className="buttons">
                {!user.hot && <button onClick={e => makeHotFunction(user.id)}>Hot</button>}
                {(user.hot || user.hot == null) && <button onClick={e => makeNotFunction(user.id)}>Not</button>}
            </div>
        </div>
    );
}
