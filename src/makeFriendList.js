import React from 'react';
import { ProfilePic } from './profile-pic';
import { ProfileListItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { Link } from 'react-router';

const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

export default function(newFriends, btnEventHandler) {
    if(newFriends.length == 0) {
        return null;
    }
    var status = newFriends[0].status;
    var btnWord;

    if(status == PENDING) {
        btnWord = 'Accept';
    } else {
        btnWord = 'End';
    }
    const friendItems = newFriends.map((dog) => {
        var link = '/profile/' + dog.id;
        return (
            <ProfileListItem key={dog.id.toString()}>
                <SidePic>
                    <ProfilePic nav
                        imgsrc={dog.profile_pic}
                        first_name={dog.first_name}
                        last_name={dog.last_name}/>
                </SidePic>
                <DogInfo><Link to={link}>{dog.first_name + ' ' + dog.last_name}</Link><Button onClick={() => btnEventHandler(dog.id)}>{btnWord} Friendship</Button></DogInfo>
            </ProfileListItem>
        );
    });

    return (
        <ul>
            {friendItems}
        </ul>
    );
}

{/******** STYLED COMPONENTS ***********/}

const SidePic = styled.div`
    width: 30%;
    text-align: center;
    display: inline-block;
    margin: 0;
    padding: 6px 0;
`;

const DogInfo = styled.div`
    width: 60%;
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 10px 0;

`;
