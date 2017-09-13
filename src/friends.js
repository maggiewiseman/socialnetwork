import React from 'react';
import ReactDOM from 'react-dom';
import { ProfilePic, PicUploader } from './profile-pic';
import { Sidebar, MainSection, UnderNav, Column } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, ProfileListItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText } from './styledComponents/text';
import { receiveFriends } from './actions';
import { connect } from 'react-redux';

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }
    render() {
        return (
            <UnderNav>
                <Column two>
                    <SidebarMenu>
                        <SectionHeader>
                            Friend Requests:
                        </SectionHeader>
                        {FriendList(this.state.friendRequests)}
                    </SidebarMenu>
                </Column>
                <Column two>
                    <SidebarMenu>
                        <SectionHeader>
                            Friends:
                        </SectionHeader>
                        {FriendList(this.state.friends)}
                    </SidebarMenu>
                </Column>
            </UnderNav>
        );
    }
}

/********* CONNECTED COMPONENT ********/

//the connect function we use below (and that was imported) will pass state to the mapStateToProps function.
const mapStateToProps = function(state) {
    return {
        friends: state.friends
    };
};

export default connect(mapStateToProps)(Friends);



/********* CHILD COMPONENTS **********/
function FriendList(newFriends) {

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

/******** STYLED COMPONENTS ***********/

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
