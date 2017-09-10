import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { FullPageModal } from './styledComponents/wrapper';
import { Button, ButtonGroup } from './styledComponents/buttons';
import { HintText, ErrorText } from './styledComponents/text';
import { SectionHeader } from './styledComponents/headers';


export function ProfilePic(props) {
    return (
        <ProfilePicFig nav={props.nav}>
            <img src={props.imgsrc} alt={`${props.first_name} ${props.last_name}`} onClick={props.showUpLoader}/>
        </ProfilePicFig>
    );
}

export function PicUploader(props) {
    return (
        <FullPageModal>
            <PicUploaderDiv>
                <SectionHeader>
                    Upload New Profile Picture
                </SectionHeader>
                {props.error && <ErrorText>{props.error}</ErrorText>}
                <input type="file" onChange={props.getFile}/>
                <ButtonGroup>
                    <Button go onClick={props.setImage}>Upload</Button>
                    <Button cancel onClick={props.hideUploader}>Cancel</Button>
                </ButtonGroup>
            </PicUploaderDiv>
        </FullPageModal>
    );

}


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

const PicUploaderDiv = styled.div`
    border: 1px solid hsla(27, 15%, 36%, 1);
    background: hsla(27, 66%, 97%, 1);
    > div,
    > input {
        margin-left: 10px;
        margin-top: 10px;
    }
    
`;
