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
        this.socket.emit('newChat');
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
        const { messages } = this.props;
        if(!messages) {
            return null;
        }

        const messageList = messages.map((msg) => {
            const { id, profile_pic, first_name, last_name, date, message } = msg;
            var link = '/profile/' + id;
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

        return (
            <UnderNav>
                <ChatBox>
                    <SectionHeader>
                        Online Chat:
                    </SectionHeader>
                    <ul>
                        {messageList}
                    </ul>
                    <textarea cols='90' rows='4' onKeyDown={this.handleInput} ref={el => this.inputField = el} >
                    </textarea>
                </ChatBox>
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
const Date = styled.p`
    color: gray;
    font-size: 12px;
    font-style: italic;

`;
const SidePic = styled.div`
    width: 30%;
    text-align: center;
    display: inline-block;
    margin: 0;
    padding: 2px 0;
`;

const DogInfo = styled.div`
    width: 60%;
    display: inline-block;
    vertical-align: top;
    margin: 0;
    padding: 10px 0;

`;

const ChatBox = styled.div`
width: 90%;
height: 500px;
overflow: scroll;
background: hsla(27, 66%, 97%, 1);
border: 1px solid hsla(27, 15%, 36%, 1);
margin: 0 auto;

> ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
`;
