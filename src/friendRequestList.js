import React from 'react';
import { ProfilePic } from './profile-pic';
import { ProfileListItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { connect } from 'react-redux';

const PENDING = 1, ACCEPTED = 2, REJECTED = 3, CANCELLED = 4, TERMINATED = 5;

class FriendRequestList extends React.Component {
    render() {
        const { friends } = this.props;
        if (!friends) {
            return null;
        }
        return makeFriendList(friends);
    }
}

const mapStateToProps = function(state) {
    console.log('Friend Request List maping state to props');
    return {
        friends: state.friends && state.friends.filter(friend => {
            if(friend.status == PENDING) {
                return friend;
            }
        })
    };
};

export default connect(mapStateToProps)(FriendRequestList);


function makeFriendList(newFriends) {
    console.log('called make friendList');
    const friendItems = newFriends.map((dog) => {
        return (
            <ProfileListItem key={dog.id.toString()}>
                <SidePic>
                    <ProfilePic nav
                        imgsrc={dog.profile_pic}
                        first_name={dog.first_name}
                        last_name={dog.last_name}/>
                </SidePic>
                <DogInfo><p>{dog.first_name + ' ' + dog.last_name}</p><Button>End Friendship</Button></DogInfo>
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
