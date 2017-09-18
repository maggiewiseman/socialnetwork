import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { UnderNav } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu } from './styledComponents/menus';
import { addMessage } from './actions';
import { Socket } from './socket';
import makeFriendList from './makeFriendList';
import { ProfilePic } from './profile-pic';
import { ProfileListItem } from './styledComponents/menus';
import { Link } from 'react-router';



const ENTER = 13;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.socket = Socket(this.props.dispatch);
    }
    componentDidMount() {
        console.log('mounting chat');
        this.socket.emit('newChat');
    }
    handleInput(e) {
        if(e.keyCode == ENTER) {
            console.log('enter! ');
            this.socket.emit('newMessage', e.target.value);
        }
        console.log(e);
    }
    render() {
        const { messages } = this.props;
        if(!messages) {
            return null;
        }

        const messageList = messages.map((dog) => {
            var link = '/profile/' + dog.id;
            return (
                <ProfileListItem key={dog.user_id.toString()}>
                    <SidePic>
                        <ProfilePic nav
                            imgsrc={dog.profile_pic}
                            first_name={dog.first_name}
                            last_name={dog.last_name}/>
                    </SidePic>
                    <DogInfo><Link to={link}>{dog.first_name + ' ' + dog.last_name}</Link></DogInfo>
                    <p>{dog.message}</p>
                </ProfileListItem>
            );
        });

        return (
            <UnderNav>
                <SidebarMenu>
                    <SectionHeader>
                        Online Chat:
                    </SectionHeader>
                    <ul>
                        {messageList}
                    </ul>
                    <textarea cols='60' rows='4' onKeyDown={this.handleInput} >
                    </textarea>
                </SidebarMenu>
            </UnderNav>
        );
    }
}


const mapStateToProps = function(state) {
    console.log('mapping state to props in chat');
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Chat);

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
