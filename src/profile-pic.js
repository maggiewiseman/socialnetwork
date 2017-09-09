import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const ProfilePicFig = styled.figure`
    border: solid 4px hsl(27, 66%, 29%);
    border-radius: ${props => props.nav ? '50%' : 0};
    overflow: hidden;
    margin: 0 .5em;

    width: ${props => props.nav ? '60px' : '90%'};
    height: ${props => props.nav ? '60px' : 'auto'};
    display: inline-block;

    > img {
        width: 100%;
        height: 100%;
    }

    :hover {
        cursor: pointer;
    }
`;

export function ProfilePic(props) {
    return (
        <ProfilePicFig nav={props.nav}>
            <img src={props.imgsrc} alt={`${props.first_name} ${props.last_name}`} onClick={props.showUpLoader}/>
        </ProfilePicFig>
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
