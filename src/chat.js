import React from 'react';
import { SidebarComp } from './sidebarComp';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Sidebar, MainSection, UnderNav } from './styledComponents/wrapper';
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
        this.socket.emit('newChat');
    }
    componentDidUpdate() {
        this.msgList.scrollTop = this.msgList.scrollHeight;
    }
    handleInput(e) {
        if(e.keyCode == ENTER) {
            e.preventDefault();
            this.socket.emit('newMessage', e.target.value);
            this.inputField.value = '';
        }
        console.log(e);
    }
    render() {
        const { messages, currUser } = this.props;
        if(!messages) {
            return null;
        }

        const messageList = messages.map((msg) => {
            const { id, profile_pic, first_name, last_name, date, message, user_id } = msg;
            var link = '/profile/' + user_id;
            return (
                <ProfileListItem key={id.toString()}>
                    <SidePic>
                        <ProfilePic nav
                            imgsrc={profile_pic}
                            first_name={first_name}
                            last_name={last_name}/>
                    </SidePic>
                    <DogInfo>
                        <Link to={link}>{first_name + ' ' + last_name}</Link>
                        <Date>{date}</Date>
                        <p>{message}</p>
                    </DogInfo>

                </ProfileListItem>
            );
        });

        var divStyle = {
            overflow: 'scroll',
            height: '450px'
        };

        return (
            <UnderNav>
                <SidebarComp first_name={currUser.first_name} last_name={currUser.last_name} profile_pic={currUser.profile_pic}/>
                <MainSection>

                    <SectionHeader>
                        Online Chat:
                    </SectionHeader>
                    <ChatBox>
                        <div style={divStyle} ref={el => this.msgList = el}>
                            <ul>
                                {messageList}
                            </ul>
                        </div>

                        Type a message:

                        <textarea cols='90' rows='4' onKeyDown={this.handleInput} ref={el => this.inputField = el} >
                        </textarea>
                    </ChatBox>
                </MainSection>
            </UnderNav>
        );
    }
}


const mapStateToProps = function(state) {
    return {
        currUser: state.currUser,
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Chat);

{/******** STYLED COMPONENTS ***********/}
const Date = styled.p`
    color: gray;
    font-size: 12px;
    font-style: italic;
    display: inline-block;
    padding-left: 20%;

`;
const SidePic = styled.div`
    width: 15%;
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

const ChatBox = styled.div`
width: 100%;


background: hsla(27, 66%, 97%, 1);
margin: 0 auto;

> div > ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
`;
