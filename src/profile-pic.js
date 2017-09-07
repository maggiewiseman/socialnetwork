import React from 'react';
import ReactDOM from 'react-dom';

export function ProfilePic(props) {
    return (
        <figure className='profile-pic'>
            <img src={props.imgsrc} alt={`${props.first_name} ${props.last_name}`} onClick={props.showUpLoader}/>
        </figure>
    );
}

export function PicUploader(props) {
    return (
        <div className="upload-wrapper">
            <div className="upload-div">
                {props.error && <div className='error'>{props.error}</div>}
                <p className="close-btn"  onClick={props.hideUploader}>X</p>
                <input type="file" onChange={props.getFile}/>
                <div className="btn-grp">
                    <button id="upload-btn" onClick={props.setImage}>Upload</button>
                    <button id="cancel-btn" onClick={props.hideUploader}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
